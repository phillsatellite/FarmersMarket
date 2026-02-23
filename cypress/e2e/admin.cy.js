describe('Admin Portal - Add Product', () => {
  beforeEach(() => {
    cy.visit('/admin')
  })

  it('renders the admin form', () => {
    cy.get('[data-testid="add-product-form"]').should('be.visible')
  })

  it('can add a new product', () => {
    cy.get('[data-testid="input-name"]').type('Fresh Peaches')
    cy.get('[data-testid="input-description"]').type('Juicy summer peaches')  // input not textarea
    cy.get('[data-testid="input-image"]').type('https://example.com/peaches.jpg')
    cy.get('[data-testid="input-price"]').type('3.99')
    cy.get('[data-testid="submit-btn"]').click()
    cy.get('[data-testid="form-message"]').should('contain', 'Product added successfully!')
  })
})