import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // You can handle the user data here and append it to the request if available.
    // This is where you customize the behavior to not throw an unauthorized error.

    if (err || !user) {
      // Handle the case when there's an error or user is not found.
      // You can log the error or do any custom logic.
      return null; // Return null to indicate that the request should continue without authentication.
    }

    return user; // Attach the user to the request.
  }
}
