describe('Wishlist', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should not add product to wishlist when user not signed in', () => {
    const button = cy.get('[data-testid="addToWishlist"]').eq(0);
    button.click();
    cy.location('pathname').should('eq', '/signin');
  });

  it('should add product to wishlist when user signed in', () => {
    // signing in
    cy.get('[data-testid="signIn-link"]').click();
    cy.get('[data-testid="email"]').type('akibur.rahman@test.no');
    cy.get('[data-testid="password"]').type('12345678');
    cy.get('[data-testid="submitButton"]').click();

    // add product to wishlist
    const button = cy.get('[data-testid="addToWishlist"]').eq(0);
    button.click();
    cy.get('[data-testid="productCard"]')
      .eq(0)
      .contains('Remove from wishlist');

    // should show the added product in wishlist page
    cy.get('[data-testid="userDropdown"]').click();
    cy.get('[data-testid="wishlist-link"]').click();
    cy.get('[data-testid="productCard"]').should('have.length', 1);
  });

  it('should remove added wishlist product', () => {
    // signing in
    cy.get('[data-testid="signIn-link"]').click();
    cy.get('[data-testid="email"]').type('akibur.rahman@test.no');
    cy.get('[data-testid="password"]').type('12345678');
    cy.get('[data-testid="submitButton"]').click();

    // remove product from wishlist
    const button = cy.get('[data-testid="removeFromWishlist"]').eq(0);
    button.click();
    cy.get('[data-testid="productCard"]').eq(0).contains('Add to wishlist');

    // should not show the product in wishlist page
    cy.get('[data-testid="userDropdown"]').click();
    cy.get('[data-testid="wishlist-link"]').click();
    cy.contains('No Product Found!');
  });
});
