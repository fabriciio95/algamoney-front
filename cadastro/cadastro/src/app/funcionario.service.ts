import { Injectable } from '@angular/core';
import { LogService } from "./log.service";

@Injectable()
export class FuncionarioService {

  ultimoId = 1;
  funcionarios = [{ id: 1, nome: 'João'}];

  constructor(private logService: LogService) {}

  adicionar(nome: string) {
    this.logService.log(`Adicionando nome ${nome}...`)

    const funcionario = {
      id: ++this.ultimoId,
      nome: nome
    };

    this.funcionarios.push(funcionario);
    console.log(JSON.stringify(this.funcionarios))
  }

  consultar () {
      return this.funcionarios;
  }
}

/**export class FuncionarioAbreviadoService extends FuncionarioService {


  constructor(private numeroCaracteres: number) {
    super();
  }


  override adicionar(nome: string): void {
    super.adicionar(nome.substring(0, this.numeroCaracteres) + '...');
  }
}*/
