import { Component } from "react";

//exemplo com class
export class Button extends Component {
    render(){
        const {text, onClick} = this.props;/*No caso de classes as props já estão implicitas, sem a necessidade do (props), a não ser que tenha um constructor*/
        return(
            <button onClick={onClick}>{text}</button> /*já esse onclick é um evento que chama o onclick que está dentro da props, que foi enviado no arquivo principal, o nome desse onclick do props poderia ser quaquer outra coisa*/
        )
    }
}