import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AlertController } from "@ionic/angular";
import { BasePageService } from "../../core/base-page.service";
import { SessionService } from "../../core/session.service";
import { GlobalEnvironment } from "../../core/global-environment";

@Component({
  selector: "app-login",
  templateUrl: "login.page.html",
  styleUrls: ["login.page.scss"],
  standalone: false,
})
export class LoginPage {
  user: any = { UserName: "", Password: "" };

  constructor(
    private router: Router,
    private http: HttpClient,
    private basePage: BasePageService,
    private session: SessionService,
    private alertCtrl: AlertController,
  ) {
    if (this.session.isLoggedIn()) {
      this.router.navigate(["/dash"], { replaceUrl: true });
    }
  }

  async login(user: any): Promise<void> {
    if (!user.UserName) {
      await this.basePage.newToast("Informe seu o Usuário.");
      return;
    }
    if (!user.Password) {
      await this.basePage.newToast("Informe sua Senha.");
      return;
    }

    const apiUrl = this.session.getApiUrl();
    if (!apiUrl) {
      await this.basePage.newAlert(
        "Atenção",
        "Configure o servidor antes de fazer login.",
      );
      return;
    }

    await this.basePage.newLoading();

    try {
      const url = `${apiUrl}/Account/Authentication`;
      const data: any = await this.http
        .get(url, {
          params: { userName: user.UserName, password: user.Password },
        })
        .toPromise();

      await this.basePage.dismissLoading();

      if (data == null) {
        user.UserName = "";
        user.Password = "";
        await this.basePage.newAlert(
          "Erro",
          "Usuário e/ou informados NÃO estão corretos!",
        );
      } else if (data === "operError") {
        user.UserName = "";
        user.Password = "";
        await this.basePage.newAlert(
          "Erro",
          "Usuário não possui um operador cadastrado!",
        );
      } else if (data === "noTeam") {
        user.UserName = "";
        user.Password = "";
        await this.basePage.newAlert(
          "Erro",
          "Usuário não possui nenhum vinculo com um time!",
        );
      } else {
        this.session.setUser(data);
        localStorage.setItem("hideKeyboard-sessionWms", "true");
        await this.basePage.newToastSuccess("Bem vindo " + user.UserName + "!");
        this.router.navigate(["/dash"], { replaceUrl: true });
      }
    } catch (error: any) {
      await this.basePage.dismissLoading();
      const msg =
        error?.error?.Detail?.message ||
        error?.message ||
        "Erro ao conectar no servidor.";
      await this.basePage.newToast(msg);
    }
  }

  async showPromptToSetApi(): Promise<void> {
    const currentApi = this.session.getApiUrl();

    const alert = await this.alertCtrl.create({
      cssClass: "ga-alert",
      header: "API",
      message: "Entre com a url da API. <br />Ex.: http://api.mayan.com/api",
      backdropDismiss: false,
      inputs: [
        {
          name: "api",
          placeholder: "API",
          value: currentApi,
        },
      ],
      buttons: [
        { text: " ", role: "cancel", cssClass: "promptCancel" },
        {
          text: " ",
          cssClass: "promptConfirm",
          handler: async (data: any) => {
            if (!data.api) {
              await this.basePage.newAlert(
                "Atenção",
                "Informe a API para conectar na aplicação!",
              );
              return;
            }
            await this.basePage.newLoading();
            try {
              const versionUrl = `${data.api}/Account/ApiVersion/?version=${GlobalEnvironment.AppVersion}`;
              const response: any = await this.http.get(versionUrl).toPromise();
              await this.basePage.dismissLoading();
              console.log(response, response.errorCode);
              if (response?.errorCode == 0) {
                console.log("aqui");
                console.log(response.Url);
                //this.session.setApiUrl(response.url);
                this.session.setApiUrl("http://localhost:60326/api");
                await this.basePage.newToastSuccess(
                  "API cadastrada " + response.url + "!",
                );
              } else {
                localStorage.removeItem("apiUrl-sessionWms");
                await this.basePage.newToast(
                  response?.ErrorMessage || "Erro ao validar API.",
                );
              }
            } catch (err: any) {
              await this.basePage.dismissLoading();
              const msg =
                err?.error?.Detail?.message ||
                err?.message ||
                "Erro ao conectar.";
              await this.basePage.newToast(msg);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
