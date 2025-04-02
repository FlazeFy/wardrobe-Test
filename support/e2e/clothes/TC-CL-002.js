// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-002 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See All Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')
            
            // Step 2: After section with title "All Clothes", there will be list of clothes that contain the clothes name & image, type, category, gender status, size, favorite, ironed status, and detail and use it button
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').each($el => {
                // Clothes label for size, gender, or qty
                cy.wrap($el).find('.label-clothes').each(($label) => {
                    cy.wrap($label).should(($el) => {
                        const classList = $el.attr('class')
                        expect(classList).to.match(/clothes_size-label|clothes_gender-label|clothes_qty-label/)
                    })
                })
                // Clothes Image
                cy.wrap($el).find('.img-clothes').should('exist')
                // Clothes Name
                cy.wrap($el).find('h4').should('exist').and('not.be.empty')
                // Clothes Category & Type
                cy.wrap($el).find('h6').should('exist').and('contain.text', '|')
                // Clothes status icon for favorited clothes, washed status, ironed status, and  
                cy.wrap($el).then(($box) => {
                    const $icons = $box.find('.box-icon')
                    if ($icons.length > 0) {
                        cy.wrap($icons).each(($icon) => {
                            cy.wrap($icon).should(($el) => {
                                const classList = $el.attr('class')
                                expect(classList).to.match(/clothes_is_scheduled-icon|clothes_is_favorite-icon|clothes_has_washed-icon|clothes_has_ironed-icon/)
                            })
                        })
                    }
                })
                // Action Button
                cy.wrap($el).find('.row').within(() => {
                    cy.get('a').contains('Use It Now!').should('exist')
                    cy.get('a').contains('Detail').should('exist')
                })
            })

            // Evidence - Step 2
            cy.screenshot(`TC-CL-002_Step-2-${date}`)
        })
    })
})
