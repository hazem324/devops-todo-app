import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: HttpErrorResponse): string {
  
  if (typeof ErrorEvent !== 'undefined' && error.error instanceof ErrorEvent) {
    return 'Network error — please check your connection.';
  }

  switch (error.status) {
    case 0:   return 'Cannot reach the server — is the backend running?';
    case 400: return 'Bad request — check the data you submitted.';
    case 401: return 'Unauthorized — please log in again.';
    case 403: return 'Forbidden — you do not have permission.';
    case 404: return 'Task not found — it may have been deleted.';
    case 409: return 'Conflict — this task already exists.';
    case 422: return 'Validation error — check all required fields.';
    case 500: return 'Server error — please try again later.';
    case 503: return 'Service unavailable — the server is down.';
    default:  return `Unexpected error (${error.status}) — please try again.`;
  }
}