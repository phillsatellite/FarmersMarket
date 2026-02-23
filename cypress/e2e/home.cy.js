describe(' Product Listing', () => {
  beforeEach(() => {
    cy.visit('/shop')
  })

  it('renders a list of products', () => {
    cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
  })

  it('can search for a product by name', () => {
    cy.get('input[type="text"]').type('apple')
    cy.get('[data-testid="product-card"]').each(($card) => {
      cy.wrap($card).contains(/apple/i)
    })
  })

  it('shows no results for a nonsense search', () => {
    cy.get('input[type="text"]').type('xyzabc123')
    cy.get('[data-testid="product-card"]').should('have.length', 0)
  })
})