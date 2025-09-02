import { PlayerModel } from "../models/player-models";


const database: PlayerModel[] = [
  {
    id: 1,
    name: "Kevin De Bruyne",
    club: "Manchester City",
    nationality: "Belgium",
    position: "Midfielder",
    statistics: {
      Overall: 91,
      Pace: 74,
      Shooting: 86,
      Passing: 93,
      Dribbling: 88,
      Defending: 64,
      Physical: 78
    }
  },
  {
    id: 2,
    name: "Erling Haaland",
    club: "Manchester City",
    nationality: "Norway",
    position: "Forward",
    statistics: {
      Overall: 90,
      Pace: 89,
      Shooting: 94,
      Passing: 72,
      Dribbling: 80,
      Defending: 45,
      Physical: 88
    }
  },
  {
    id: 3,
    name: "Luka Modric",
    club: "Real Madrid",
    nationality: "Croatia",
    position: "Midfielder",
    statistics: {
      Overall: 88,
      Pace: 73,
      Shooting: 76,
      Passing: 90,
      Dribbling: 89,
      Defending: 72,
      Physical: 66
    }
  },
  {
    id: 4,
    name: "Vinicius Jr",
    club: "Real Madrid",
    nationality: "Brazil",
    position: "Forward",
    statistics: {
      Overall: 89,
      Pace: 95,
      Shooting: 83,
      Passing: 79,
      Dribbling: 92,
      Defending: 35,
      Physical: 70
    }
  },
  {
    id: 5,
    name: "Robert Lewandowski",
    club: "Barcelona",
    nationality: "Poland",
    position: "Forward",
    statistics: {
      Overall: 91,
      Pace: 77,
      Shooting: 92,
      Passing: 79,
      Dribbling: 85,
      Defending: 43,
      Physical: 82
    }
  },
  {
    id: 6,
    name: "Pedri",
    club: "Barcelona",
    nationality: "Spain",
    position: "Midfielder",
    statistics: {
      Overall: 86,
      Pace: 79,
      Shooting: 74,
      Passing: 87,
      Dribbling: 89,
      Defending: 65,
      Physical: 68
    }
  },
  {
    id: 7,
    name: "Kylian Mbappé",
    club: "Paris Saint-Germain",
    nationality: "France",
    position: "Forward",
    statistics: {
      Overall: 92,
      Pace: 97,
      Shooting: 89,
      Passing: 80,
      Dribbling: 92,
      Defending: 38,
      Physical: 77
    }
  },
  {
    id: 8,
    name: "Lionel Messi",
    club: "Paris Saint-Germain",
    nationality: "Argentina",
    position: "Forward",
    statistics: {
      Overall: 93,
      Pace: 85,
      Shooting: 92,
      Passing: 91,
      Dribbling: 95,
      Defending: 34,
      Physical: 65
    }
  },
  {
    id: 9,
    name: "Neymar Jr",
    club: "Paris Saint-Germain",
    nationality: "Brazil",
    position: "Forward",
    statistics: {
      Overall: 90,
      Pace: 91,
      Shooting: 85,
      Passing: 87,
      Dribbling: 94,
      Defending: 37,
      Physical: 62
    }
  },
  {
    id: 10,
    name: "Cristiano Ronaldo",
    club: "Manchester United",
    nationality: "Portugal",
    position: "Forward",
    statistics: {
      Overall: 91,
      Pace: 85,
      Shooting: 93,
      Passing: 82,
      Dribbling: 88,
      Defending: 35,
      Physical: 77
    }
  },
  {
    id: 11,
    name: "Bruno Fernandes",
    club: "Manchester United",
    nationality: "Portugal",
    position: "Midfielder",
    statistics: {
      Overall: 87,
      Pace: 75,
      Shooting: 84,
      Passing: 89,
      Dribbling: 84,
      Defending: 65,
      Physical: 74
    }
  },
  {
    id: 12,
    name: "Mohamed Salah",
    club: "Liverpool",
    nationality: "Egypt",
    position: "Forward",
    statistics: {
      Overall: 90,
      Pace: 93,
      Shooting: 89,
      Passing: 81,
      Dribbling: 90,
      Defending: 45,
      Physical: 75
    }
  },
  {
    id: 13,
    name: "Virgil van Dijk",
    club: "Liverpool",
    nationality: "Netherlands",
    position: "Defender",
    statistics: {
      Overall: 90,
      Pace: 78,
      Shooting: 60,
      Passing: 71,
      Dribbling: 72,
      Defending: 92,
      Physical: 86
    }
  },
  {
    id: 14,
    name: "Joshua Kimmich",
    club: "Bayern Munich",
    nationality: "Germany",
    position: "Midfielder",
    statistics: {
      Overall: 89,
      Pace: 74,
      Shooting: 74,
      Passing: 90,
      Dribbling: 84,
      Defending: 83,
      Physical: 78
    }
  },
  {
    id: 15,
    name: "Sadio Mané",
    club: "Bayern Munich",
    nationality: "Senegal",
    position: "Forward",
    statistics: {
      Overall: 89,
      Pace: 91,
      Shooting: 84,
      Passing: 79,
      Dribbling: 88,
      Defending: 44,
      Physical: 75
    }
  },
  {
    id: 16,
    name: "Karim Benzema",
    club: "Real Madrid",
    nationality: "France",
    position: "Forward",
    statistics: {
      Overall: 91,
      Pace: 80,
      Shooting: 92,
      Passing: 83,
      Dribbling: 87,
      Defending: 40,
      Physical: 79
    }
  },
  {
    id: 17,
    name: "Thibaut Courtois",
    club: "Real Madrid",
    nationality: "Belgium",
    position: "Goalkeeper",
    statistics: {
      Overall: 90,
      Pace: 50,
      Shooting: 20,
      Passing: 70,
      Dribbling: 40,
      Defending: 18,
      Physical: 85
    }
  },
  {
    id: 18,
    name: "Jude Bellingham",
    club: "Real Madrid",
    nationality: "England",
    position: "Midfielder",
    statistics: {
      Overall: 86,
      Pace: 82,
      Shooting: 76,
      Passing: 82,
      Dribbling: 84,
      Defending: 77,
      Physical: 82
    }
  },
  {
    id: 19,
    name: "Riyad Mahrez",
    club: "Manchester City",
    nationality: "Algeria",
    position: "Forward",
    statistics: {
      Overall: 87,
      Pace: 82,
      Shooting: 82,
      Passing: 84,
      Dribbling: 90,
      Defending: 38,
      Physical: 64
    }
  },
  {
    id: 20,
    name: "Marc-André ter Stegen",
    club: "Barcelona",
    nationality: "Germany",
    position: "Goalkeeper",
    statistics: {
      Overall: 89,
      Pace: 48,
      Shooting: 15,
      Passing: 75,
      Dribbling: 45,
      Defending: 18,
      Physical: 82
    }
  }
];

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  return database;
}

export const findPlayerById = async (id: number): Promise<PlayerModel | undefined> => {
    return database.find(player => player.id === id);
}