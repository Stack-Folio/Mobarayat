export interface LeagueType {
  leagueId: string;
  leagueName: string;
  leagueType?: string;
  leagueLogo: string;
  leagueCountryFlag?: null | string;
  start?: string;
  end?: string;
  current?: boolean;
}
export interface FixtureMatches {
  fixtureId: string;
  status: string;
  fixtureFullDate: string;
  fixtureDate: string;
  fixtureTime: string;
  league: {
    leagueId: string;
    leagueName: string;
    leagueLogo: string;
  };
  matches: FixtureType[];
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: null | string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: null | string;
    };
  };
  goals: {
    home: number;
    away: number;
    hasPenalty: boolean;
    penalty: { home: null | number; away: null | number };
  };
}
export interface TodayMatchesType {
  leagueName: string;
  leagueLogo: string;
  leagueId: string;
  matches: FixtureMatches[];
}
export interface FixtureType {
  fixtureId: string;
  status?: string;
  fixtureDate: string;
  fixtureTime: string;
  fixtureFullDate: string;
  league?: null | string;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: null | string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: null | string;
    };
  };
  goals: {
    home: number;
    away: number;
    hasPenalty: boolean;
    penalty: { home: null | number; away: null | number };
  };
}
export interface ScorersType {
  player: {
    id: string;
    name: string;
    firstname: string;
    lastname: string;
    photo: string;
  };
  statistics: [
    {
      team: {
        id: string;
        name: string;
        logo: string;
      };
      goals: {
        total: number;
      };
    }
  ];
}
export interface PaginationType {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
export interface EventsType {
  time: {
    elapsed: number;
    extra: null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: 163189;
    name: string;
  };
  assist: {
    id: number;
    name: string;
  };
  type: string;
  detail: string;
  comments: null;
}
export interface TeamsType {
  home: {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  };
  away: {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  };
}
export interface LineupsType {
  team: {
    id: number;
    name: string;
    logo: string;
    colors: {
      player: {
        primary: string;
        number: string;
        border: string;
      };
      goalkeeper: {
        primary: string;
        number: string;
        border: string;
      };
    };
  };
  coach: {
    id: number;
    name: string;
    photo: string;
  };
  formation: string;
  startXI: [
    {
      player: {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: string;
      };
    }
  ];
  substitutes: [
    {
      player: {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: null;
      };
    }
  ];
}

export interface StartXITypes {
  player: {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string;
  };
}
export interface FixtureDetailsType {
  fixture: {
    fixtureId: number;
    fixtureDate: string;
    fixtureTime: string;
    referee: string;
    venueName: string;
    status: {
      long: string;
      short: string;
      elapsed: number;
      extra: number;
    };
  };
  league: LeagueType;
  teams: TeamsType;
  goals: {
    home: number;
    away: number;
  };
  events: EventsType[];
  lineups: LineupsType[];
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: null | number;
      away: null | number;
    };
    penalty: {
      home: null | number;
      away: null | number;
    };
  };
}

export interface UserTypes {
  name?: string;
  lastName?: string;
  email: string;
  password?: string;
}

export interface ArticleType {
  _id?: string;
  Name: string;
  NameAr: string;
  Title: string;
  TitleAr: string;
  Description: string;
  DescriptionAr: string;
  Keywords: string;
  KeywordsAr: string;
  Body: string;
  BodyAr: string;
  ImageURL: string;
  createdAt?: string;
}

export interface ArticleData {
  name: string;
  title: string;
  description: string;
  keywords: string;
  Body: string;
  ImageURL: string;
}
export interface StandingsTypes {
  rank: number;
  points: number;
  goalsDiff: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
}
export interface FavoriteTypes {
  UserId: string;
  Type: string;
  LeagueId?: string;
  MtachId?: string;
}
export interface GetFavoriteTypes {
  _id: string;
  UserId: string;
  Type: string;
  MatchId: number;
}
export interface StatisticsTypes {
  team: {
    id: string;
    name: string;
    logo: string;
  };
  statistics: [
    {
      type: string;
      value: string;
    }
  ];
}
