import { GameManager } from "./GameManager";
import { UIManager } from "./UIManager";

export class StaticInstance{
    static gameManager: GameManager|undefined = undefined;
    static uiManager: UIManager|undefined = undefined;

    static setGameManager(context: GameManager){
        StaticInstance.gameManager = context;
    }

    static setUIManager(context: UIManager){
        StaticInstance.uiManager = context;
    }
}