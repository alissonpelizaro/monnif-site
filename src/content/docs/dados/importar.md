---
title: Importar extrato
description: OFX e CSV do banco, com prévia antes de gravar, conciliação com o que já estava previsto e desfazer da leva inteira.
order: 1
print: importar
---

O Monnif **não se conecta ao seu banco** e nunca pede a sua senha bancária. Para trazer os dados sem digitar tudo, o caminho é o arquivo: você baixa o extrato no site do próprio banco e envia aqui.

## Formatos

- **OFX** — o formato padrão de extrato bancário. É o preferido: já vem com data, valor e descrição bem definidos.
- **CSV** — funciona desde que tenha colunas de data e valor.

Quase todo banco brasileiro oferece um dos dois na área de extratos ou "exportar".

## O fluxo

1. **Escolher o arquivo.** Clique na área tracejada e selecione o extrato.
2. **Conferir a prévia.** Nada é gravado ainda. O Monnif mostra cada linha lida, o que entendeu de data, valor e descrição, e para qual categoria pretende mandar.
3. **Ajustar.** Corrija categorias, tire linhas que não deveriam entrar.
4. **Confirmar.** Só agora os lançamentos passam a existir.

## Conciliação

Se você já tinha lançado o aluguel como previsto e ele aparece no extrato, o Monnif reconhece o par em vez de criar uma segunda linha. Duplicadas prováveis vêm sinalizadas na prévia para você decidir.

## Desfazer

Depois de importar, o botão **Desfazer** reverte **a importação inteira** de uma vez — não linha por linha. É a rede de segurança para o caso de arquivo errado, mês errado ou conta errada.

## Bom saber

- A categorização da prévia usa as suas [regras automáticas](/docs/dados/automacao/). Quanto mais você usa o app, melhor ela fica.
- Importar o mesmo arquivo duas vezes é detectado pela conciliação, mas o hábito saudável é desfazer e reimportar.
