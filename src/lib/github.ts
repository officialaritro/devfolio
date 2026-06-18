const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export type ContributionDay = {
  contributionCount: number;
  date: string;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: Array<{ contributionDays: ContributionDay[] }>;
};

export async function fetchGithubContributions(
  username: string,
  token: string
): Promise<ContributionCalendar> {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? 'GitHub GraphQL error');
  return json.data.user.contributionsCollection.contributionCalendar;
}
