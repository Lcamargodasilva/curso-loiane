import { HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Observable, filter, map, pipe, tap } from "rxjs"

export function filterResponse<T>() {
  return (source: Observable<HttpEvent<T>>) => source.pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpEvent<T>) => {
      if (res instanceof HttpResponse) {
        return res;
      }
      throw new Error("HttpResponse not available.");
    }),
    map((response: HttpResponse<T>) => response.body)
  );
}

export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      if (event.total !== undefined) {
        cb(Math.round((event.loaded * 100) / event.total));
      }
    }
  });
}
