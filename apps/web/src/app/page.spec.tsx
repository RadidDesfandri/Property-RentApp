import Home from './(home)/(withNavbar)/page';

describe('<Home />', () => {
  it('mounts', () => {
    cy.mount(<Home />);
  });
});
