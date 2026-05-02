// api/get-products.js
export default async function handler(req, res) {
  // Captura o parâmetro 'first' da URL, definindo 10 como padrão caso não exista
  const first = req.query.first ? parseInt(req.query.first) : 10;

      // PERMISSÕES DE CORS - Liberam o acesso para o seu site (Para não dar problçema de cross origin)
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Shopify-Storefront-Access-Token');

    // Resposta rápida para o "preflight" do navegador (requisição OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

  const query = `
    {
      products(first: ${first}) {
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