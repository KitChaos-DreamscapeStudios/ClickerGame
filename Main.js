class Modifier{
    constructor(ProductionMod, HungerMod, TimeLeft, FoodPerClick){
            this.ProductionMod = ProductionMod;
            this.HungerMod = HungerMod;
            this.TimeLeft = TimeLeft;
            this.FoodPerClick = FoodPerClick;
    }

}
class Player{
    constructor(){
        this.Buildings = [];
        this.Modifers = [];

    }
}
const MainPlayer = Player();
function Tick(){
    for(let i = 0; i < MainPlayer.Modifers.length; i++){
        if(MainPlayer.Modifers[i].TimeLeft != -100){
            MainPlayer.Modifers[i].TimeLeft -= 1;
            if(MainPlayer.Modifers[i].TimeLeft <=0){

                
                MainPlayer.Modifers = MainPlayer.Modifers.splice(i,1)
                
            }
        }
       
        
    }
    window.setTimeout(Tick, 1)
}