describe('Product Edit and Delete', () => {
  beforeEach(() => {
    cy.visit('/shop') 
  })

  it('can open the edit form for a product', () => {
    cy.get('[data-testid="product-card"]').first().click()
    cy.get('[data-testid="modal-content"]').should('be.visible')
  })

  it('can update a product name', () => {
    cy.get('[data-testid="product-card"]').first().click()
    cy.get('[data-testid="edit-input-name"]').clear().type('Updated Tomatoes')
    cy.get('[data-testid="save-btn"]').click()
    cy.get('[data-testid="modal-content"]').should('not.exist')
    cy.contains('Updated Tomatoes').should('be.visible')
  })

  it('can delete a product', () => {
    cy.get('[data-testid="product-card"]').then(($cards) => {
      const initialCount = $cards.length
      cy.get('[data-testid="product-card"]').first().click()
      cy.get('[data-testid="delete-btn"]').click()
      cy.get('[data-testid="product-card"]').should('have.length', initialCount - 1)
    })
  })
})

//test ignore this comment 