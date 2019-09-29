import { Injectable } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorComponent } from "src/app/error/error.component";

@Injectable()
export class ErrorinterceptorService implements HttpInterceptor {
  constructor(private matDialog: MatDialog) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An Unkown error occured';
        if (error.error.message) {
          error = error.error.message;
        }
        this.matDialog.open(ErrorComponent, { data: { message: errorMessage },
        width: '300px',
        height: '300px',
        panelClass: 'epsSelectorPanel'});
        alert(error.error.message);
        return throwError(error);
      })
    );
  }
}
