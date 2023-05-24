import { Controller, Get, Render } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() { }


  @Get()
  @Render('index')
  home() {
    return {
      message: `Home page, i'm so excited`
    }
  }

  @Get('login')
  @Render('login')
  login() {
    return {
      message: `Home page, i'm so excited`
    }
  }


  @Get('signup')
  @Render('signup')
  signup() {
    return {
      message: `Home page, i'm so excited`
    }
  }
}
