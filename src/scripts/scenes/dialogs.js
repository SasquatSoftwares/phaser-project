export default class dialogs {
    static dialog_welcome = {
        value: "Bem-vindo a Yssy! Posso ajudar em algo?",
        secondValue: "Olá novamente, precisa de mais alguma coisa?",
        options: [{
                text: "Quero conhecer a Yssy",
                actions: [{
                    type: "response",
                    value: "Por favor entre, sinta-se a vontade em conhecer nossa sede virtual!"
                }]
            },
            {
                text: "Quero falar com alguém da área de desenvolvimento",
                actions: [{
                        type: "response",
                        value: "Ah, tudo bem! Vou localizar alguem pra te atender, aguarde um momento, por favor..."
                    },
                    {
                        type: "contactSomeone",
                        value: "gustavo.perez@yssy.com.br"
                    }
                ]
            },
            {
                text: "Quero contratar um serviço",
                actions: [{
                    type: "response",
                    value: "Precisa de ajuda em qual tipo de serviço?",
                    options: [{
                        text: "Desenvolvimento de aplicações usando Node.JS e React.JS",
                        actions: [
                            { type: "openurl", value: "https://www.yssy.com.br" }
                        ]
                    }]
                }]
            },
            {
                text: "Quero conhecer os cursos da Yssy Academy",
                actions: [{
                    type: "response",
                    value: "Ah, bacana! Os cursos que temos disponíveis são estes:",
                    options: [{
                        text: "Desenvolvimento de aplicações usando Node.JS e React.JS",
                        actions: [
                            { type: "openurl", value: "https://www.yssy.com.br" }
                        ]
                    }]
                }]
            }
        ]
    };
}