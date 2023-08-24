import { revalidateTag } from 'next/cache';

export async function fetchGraphQL(query) {
  try {
    const response = await fetch(process.env.HYGRAPH_GRAPHQL_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchGraphQLAndRevalidate(query) {
  const data = await fetchGraphQL(query);

  // Priskirkite žymą, susijusią su šiais duomenimis
  const tag = 'post';
  revalidateTag(tag);

  return data;
}
