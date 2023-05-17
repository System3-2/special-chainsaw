import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class MultiAuthGuard extends AuthGuard(['jwt', 'google', 'github']) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
