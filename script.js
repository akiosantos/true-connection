document.addEventListener("DOMContentLoaded", () => {

    const output = document.getElementById("output");
    const input = document.getElementById("input");
    const terminal = document.getElementById("terminal");

    let stage = 0;
    let username = "";

    /* foco no terminal */
    input.focus();

    terminal.addEventListener("click", () => {
        input.focus();
    });

    /* digitação */
    function type(text, callback){
        let i = 0;
        const interval = setInterval(() => {
            if(i < text.length){
                output.innerHTML += text.charAt(i);
                i++;
                output.scrollTop = output.scrollHeight;
            }else{
                clearInterval(interval);
                output.innerHTML += "<br>";
                if(callback) callback();
            }
        }, 20);
    }

    /* imprimir resposta instantânea (para os inputs do usuário) */
    function print(text){
        output.innerHTML += text + "<br>";
        output.scrollTop = output.scrollHeight;
    }

    /* pegar horário */
    function getHour(){
        const now = new Date();
        return now.toLocaleTimeString("pt-BR", {
            hour:"2-digit",
            minute:"2-digit"
        });
    }

    /* pedir nome e ativar flash da tela */
    function askName(){
        type("Inicializando conexão...", () => {
            
            // ⚡ ATIVA O FLASH NA TELA ⚡
            document.body.classList.add("screen-flash");
            
            type("Sinal detectado...", () => {
                
                // Remove a classe depois que a animação termina para manter limpo
                setTimeout(() => {
                    document.body.classList.remove("screen-flash");
                }, 1000); 

                type("Digite seu nome:", () => {
                    stage = 1;
                });
            });
        });
    }

    /* depois do nome */
    function afterName(){
        const hora = getHour();
        type(username + "...", () => {
            type("Agora são exatamente " + hora + ".", () => {
                type("Curioso você estar aqui neste momento.", () => {
                    type("Se você pudesse fazer uma pergunta a Deus,", () => {
                        type("qual pergunta faria?", () => {
                            stage = 2;
                        });
                    });
                });
            });
        });
    }

    /* pergunta fé */
    function askFaith(){
        type("Pergunta registrada.", () => {
            type("Você acredita que Deus se importa com sua vida?", () => {
                type("Digite: sim ou não", () => {
                    stage = 3;
                });
            });
        });
    }

    /* mensagem evangelística */
    function message(){
        type(username + "...", () => {
            type("Existe algo que você precisa saber.", () => {
                type("Deus não está distante de você.", () => {
                    type("Ele conhece seu nome.", () => {
                        type("Ele conhece sua história.", () => {
                            type("Ele conhece seu coração.", () => {
                                type('"Vinde a mim todos os que estais cansados', () => {
                                    type("e sobrecarregados,", () => {
                                        type("e eu vos aliviarei.\"", () => {
                                            type("Mateus 11:28", () => {
                                                type("Você gostaria de falar com Deus agora?", () => {
                                                    stage = 4;
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    /* final com drama e tela limpa */
    function endSession(){
        // Já desabilita o input para o usuário não digitar mais nada
        input.disabled = true; 

        type("Encerrando conexão...", () => {
            
            // Pausa de 1 segundo
            setTimeout(() => {
                type("Sessão encerrada.", () => {
                    
                    // PAUSA DE 2 SEGUNDOS ANTES DE LIMPAR TUDO
                    setTimeout(() => {
                        
                        // 🧹 A MÁGICA DA LIMPEZA ACONTECE AQUI 🧹
                        output.innerHTML = ""; 
                        
                        // Espera mais 1 segundo de tela preta antes de mostrar o versículo
                        setTimeout(() => {
                            
                            type("Romanos 10:9", () => {
                                
                                // Mais um fôlego antes do versículo
                                setTimeout(() => {
                                    type('"Se com tua boca confessares a Jesus como Senhor', () => {
                                        type("e em teu coração creres que Deus o ressuscitou", () => {
                                            type("dentre os mortos,", () => {
                                                type("serás salvo.\"", () => {
                                                    
                                                    // Última pausa longa antes da despedida
                                                    setTimeout(() => {
                                                        print("<br>");
                                                        type("Ele aguarda seu próximo login, " + username + ".", () => {
                                                            // Fim absoluto
                                                        });
                                                    }, 2000);

                                                });
                                            });
                                        });
                                    });
                                }, 600);
                            });

                        }, 1000); // Fim da espera da tela preta

                    }, 2000); // Fim da pausa dramática antes da limpeza

                });
            }, 1000);
        });
    }

    /* controle de input do usuário */
    input.addEventListener("keydown", (e) => {
        if(e.key !== "Enter") return;

        const value = input.value.trim();
        if(value === "") return;

        input.value = "";
        print("> " + value);

        if(stage === 1){
            username = value;
            type("Então você é " + username + ".", () => {
                setTimeout(afterName, 600);
            });
        }
        else if(stage === 2){
            setTimeout(askFaith, 600);
        }
        else if(stage === 3){
            if(value.toLowerCase() === "sim"){
                message();
            } else {
                type("Talvez você ainda não esteja pronto.", () => {
                    endSession();
                });
            }
        }
        else if(stage === 4){
            if(value.toLowerCase() === "sim"){
                type("Você pode falar com Deus agora.", () => {
                    type("Ele está ouvindo você.", () => {
                        type("Senhor Jesus,", () => {
                            type("entra na minha vida,", () => {
                                type("perdoa meus pecados,", () => {
                                    type("e me guia no teu caminho.", () => {
                                        type("Amém.", () => {
                                            endSession();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else {
                type("Mesmo assim, Deus continua perto de você.", () => {
                    endSession();
                });
            }
        }
    });

    /* iniciar aplicação */
    askName();

});