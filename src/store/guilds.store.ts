import {makeAutoObservable} from "mobx";
import {IGuild} from "../interfaces/IGuild";

class GuildsStore{
	guilds:IGuild[] = [];

	constructor() {
		makeAutoObservable(this, {}, {deep:true});
	}

	setGuilds(guilds:IGuild[]){
		this.guilds = guilds;
	}
}

export default new GuildsStore();
