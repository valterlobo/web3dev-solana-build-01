const anchor = require("@coral-xyz/anchor");
// Precisa do programa do sistema, falaremos sobre isso em breve.
const { SystemProgram } = anchor.web3;

describe("gif_program", () => {

  // Configure the client to use the local cluster.

  // Crie e defina o provedor. Nós o configuramos antes, mas precisávamos atualizá-lo, para que ele pudesse se comunicar com nosso frontend!
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  it("Is initialized!", async () => {
    // Add your test here.
    const program = anchor.workspace.GifProgram;

    //

    // Crie um par de chaves de conta para nosso programa usar.
    const baseAccount = anchor.web3.Keypair.generate();

    // Chame start_stuff_off, passe os parâmetros necessários!
    let tx = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("📝 Sua assinatura de transação", tx);

    // Obtem dados da conta.
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())
    //

    // Chama add_gif!
  // Você precisará agora passar um link do GIF para a função! Você também precisará passar o usuário que está enviando o GIF!
  await program.rpc.addGif("insira_o_link_do_seu__gif_aqui", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  // Chama a conta
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  // Acessa o gif_list na conta
  console.log("👀 GIF List", account.gifList);

  });
});
