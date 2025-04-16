// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-001 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See List Of Generated Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')

            // Step 3: Find section "My Outfit", there will be a list of outfit that contain outfit name, clothes list, total used, and outfit description
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').each($el => {
                // Outfit Name
                cy.wrap($el).find('h4.outfit-name').should('exist').and('not.be.empty')
                // Total Used
                cy.wrap($el).then(($box) => {
                    const $total_used = $box.find('h6.total-used')
                    if($total_used.length){
                        const text = $total_used.text().trim()
                        expect(text).to.include('Total Used')

                        const total_used_number = text.replace(' Total Used','')
                        const number = parseInt(total_used_number)
                        expect(number).to.be.a('number').to.be.at.least(1)
                    }
                })
                // Outfit Note
                cy.wrap($el).find('p.outfit-note').should('exist').and('not.be.empty')
                // Clothes List
                cy.wrap($el).then(($box) => {
                    const $clothes_list = $box.find('.clothes-holder .clothes-box')
                    if($clothes_list.length){
                        cy.get('.clothes-holder .clothes-box').each($cl_el => {
                            // Clothes Image
                            cy.wrap($cl_el).find('.img-clothes').should('exist')
                            // Clothes Type & Clothes Name
                            cy.wrap($cl_el).find('h6').should('exist').and('contain.text', '|')
                            // Clothes Merk
                            cy.wrap($cl_el).find('p').should('exist').and('not.be.empty')
                        })
                    }
                })
            })

            // Evidence - Step 3
            cy.screenshot(`TC-OF-001_Step-3-${date}`)
        })
    })
})
