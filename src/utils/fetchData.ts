import Cookies from "js-cookie";
import { ArticleType, FavoriteTypes, UserTypes } from "./Types";

const url = process.env.NEXT_PUBLIC_API_NAME;
export const getLeagues = async ({
  lang = "ar",
  page = "1",
  limit = "15",
  type,
}: {
  lang: string;
  page: string;
  limit: string;
  type?: string;
}) => {
  const timestamp = new Date().getTime();
  try {
    const response = await fetch(
      `${url}/api/getLeagues?lang=${lang}&page=${page}&limit=${limit}&type=${
        type || ""
      }&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getLeagueById = async ({
  lang = "ar",
  leagueId,
}: {
  lang: string;
  leagueId: string;
}) => {
  try {
    const response = await fetch(
      `${url}/api/getLeagues?lang=${lang}&leagueId=${leagueId}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getSavedLeagues = async ({ lang = "ar" }: { lang: string }) => {
  try {
    const response = await fetch(`${url}/api/getSavedLeagues?lang=${lang}&t=1`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getTopscorers = async ({
  lang = "ar",
  leagueId,
  season,
}: {
  lang: string;
  leagueId: string;
  season: number;
}) => {
  const timestamp = new Date().getTime();
  try {
    const response = await fetch(
      `${url}/api/getTopscorers?lang=${lang}&leagueId=${leagueId}&season=${season}&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getFixtures = async ({
  leagueId,
  date = "2024-11-11",
  lang = "ar",
  season,
}: {
  leagueId: string;
  date: string;
  lang: string;
  season: number;
}) => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${url}/api/getFixtures?leagueId=${leagueId}&date=${date}&lang=${lang}&season=${season}&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getFixtureDetailsById = async ({
  matchId,
  lang = "ar",
}: {
  matchId: string;
  lang: string;
}) => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${url}/api/getFixtureDetails?fixtureId=${matchId}&lang=${lang}&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getMatches = async ({
  date,
  lang = "ar",
  page = "1",
  limit = "15",
}: {
  date: string;
  lang: string;
  page: string;
  limit: string;
}) => {
  const timestamp = new Date().getTime();
  try {
    const response = await fetch(
      `${url}/api/getFixtures?date=${date}&lang=${lang}&t=1&page=${page}&limit=${limit}&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getBestDates = async ({
  lang = "ar",
  season = 2024,
}: {
  season: number;
  lang: string;
}) => {
  const timestamp = new Date().getTime();
  try {
    const response = await fetch(
      `${url}/api/getBestEvents?lang=${lang}&season=${season}&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getStandings = async ({
  lang = "ar",
  season = 2024,
  leagueId,
}: {
  season: number;
  lang: string;
  leagueId: string;
}) => {
  const timestamp = new Date().getTime();
  try {
    const response = await fetch(
      `${url}/api/getStandings?lang=${lang}&leagueId=${leagueId}&season=${season}&t=${timestamp}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
// Register
export const register = async ({ user }: { user: UserTypes }) => {
  try {
    const response = await fetch(`${url}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const login = async ({ user }: { user: UserTypes }) => {
  try {
    const response = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }

    Cookies.set("name", JSON.stringify(result.user));

    return result;
  } catch (error) {
    console.error(error);
  }
};
export const forgetPassword = async ({ email }: { email: string }) => {
  try {
    const response = await fetch(`${url}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const verifyCode = async ({
  data,
}: {
  data: { email: string; code: string };
}) => {
  try {
    const response = await fetch(`${url}/api/auth/verify-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const resetPassword = async ({
  data,
}: {
  data: { email: string; code: string };
}) => {
  try {
    const response = await fetch(`${url}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const checkToken = async ({ token }: { token: string }) => {
  try {
    const response = await fetch(`${url}/api/auth/check-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
// Articles
export const getArticles = async () => {
  try {
    const response = await fetch(`${url}/api/articles?t=1`);
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getArticle = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`${url}/api/articles/${id}`);
    const result = await response.json();

    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const editArticle = async ({
  id,
  data,
  token,
}: {
  id?: string;
  data: ArticleType;
  token: string;
}) => {
  try {
    const response = await fetch(`${url}/api/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const addArticle = async ({
  data,
  token,
}: {
  data: ArticleType;
  token: string;
}) => {
  try {
    const response = await fetch(`${url}/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const deleteArticle = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  try {
    const response = await fetch(`${url}/api/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Favorite
export const addFavorite = async (data: FavoriteTypes, token: string) => {
  try {
    const response = await fetch(`${url}/api/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data }),
    });
    const result = await response.json();

    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const getFavorite = async ({
  UserId,
  Type,
  token,
}: {
  UserId: string;
  Type: string;
  token: string;
}) => {
  const timestamp = new Date().getTime();
  try {
    const response = await fetch(
      `${url}/api/favorite?UserId=${UserId}&Type=${Type}&t=${timestamp}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Translates

export const getTexts = async ({ token }: { token: string }) => {
  try {
    const response = await fetch(`${url}/api/translations/original-texts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const updateText = async ({
  data,
  token,
}: {
  data: { originalText: string; value: string };
  token: string;
}) => {
  try {
    const response = await fetch(`${url}/api/translations/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      return { rs: 400, ...result };
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
