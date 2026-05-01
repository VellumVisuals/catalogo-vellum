// api/get-products.js
export default async function handler(req, res) {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 { amount }
                }
              }
            }
            images(first: 1) {
              edges {
                node { url }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${process.env.SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados do acervo.' });
  }
}