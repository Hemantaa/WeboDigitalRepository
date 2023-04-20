import { Injectable } from "@angular/core";

import { Team } from "../models/Team.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable()
export class TeamService {

    constructor(private db: AngularFirestore) { }

    addTeam(team: Team) {
        this.db.collection('/teams').add(team);

    }
    getAllTeams() {
        return this.db.collection('/teams').snapshotChanges();
    }

    getAllPlaneTeams() {
        return this.db.collection('/teams').valueChanges();
    }

    deleteTeam(id: string) {
        this.db.collection('/teams').doc(id).delete();
    }
}