export type Player = {
      assists: number;
      attacker: string;
      boost: number;
      cartouches: number;
      demos: number;
      goals: number;
      hasCar: boolean;
      id: string;
      isDead: boolean;
      isPowersliding: boolean;
      isSonic: boolean;
      location: {
            X: number;
            Y: number;
            Z: number;
            pitch: number;
            roll: number;
            yaw: number;
      };
      name: string;
      onGround: boolean;
      onWall: boolean;
      primaryID: string;
      saves: number;
      score: number;
      shortcut: number;
      shots: number;
      speed: number;
      team: number;
      touches: number;
};

export type Team = {
      name: string,
      players: Player[],
      score: number,
};

export type Ball = {
      location: {
            X: number;
            Y: number;
            Z: number;
      };
      speed: number,
      team: number,
}

export type Event = {
      event_name: string;
      main_target: EventTarget;
      match_guid: string;
      secondary_target: EventTarget;
      type: string;
}

export type EventTarget = {
      id: string;
      name: string;
      team_num: number;
}

export type Goal = {
      assister: {
            id: ''; 
            name: '';
      };
      scorer: {
            id: string; 
            name: string;
            teamnum: number;
      };
      speed: number;
}