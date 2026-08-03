---
title: Segurança da conta
description: Verificação em duas etapas, códigos de backup, sessão e o que fazer se algo parecer errado.
order: 4
---

Esta página trata do que **você** controla. O que o Monnif faz do lado dele está em [Segurança](/seguranca/).

## Ligar a verificação em duas etapas

O 2FA fica no [Perfil](/docs/conta/perfil/). Ao ligar:

1. O Monnif mostra um QR Code.
2. Você lê com um aplicativo autenticador — Google Authenticator, Authy, 1Password, o que preferir.
3. Digita o código de 6 dígitos para confirmar.

A partir daí, todo login pede a senha e, em seguida, o código do aplicativo.

## Códigos de backup

Junto com o QR Code vêm **códigos de backup de uso único**. Guarde-os fora do celular — impressos, num gerenciador de senhas, em qualquer lugar que sobreviva à perda do aparelho.

Perdeu o celular e não tem os códigos? Não há caminho automático de recuperação. É por isso que eles existem.

## Sua sessão

O acesso vale por 6 horas e é renovado em silêncio enquanto você usa o app, por um token guardado em cookie que nenhum JavaScript de página consegue ler. Sair pelo menu encerra a sessão.

## Boas práticas que valem a pena

- Senha exclusiva do Monnif, de preferência gerada por um gerenciador.
- 2FA ligado — é o item de maior efeito nesta lista.
- Ao usar computador compartilhado, sair pelo menu em vez de só fechar a aba.
- Revisar o [Histórico](/docs/dados/historico/) se algum número parecer estranho.

## Algo errado?

Suspeita de acesso indevido: troque a senha imediatamente pelo Perfil, ligue o 2FA e escreva para [contato@monnif.com](mailto:contato@monnif.com). Se encontrou uma falha de segurança no produto, o caminho para reportar está na [página de Segurança](/seguranca/).
