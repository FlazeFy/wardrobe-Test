// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-009 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Stats Of Most Used Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')

            // Step 3: Find section "Most Used", the line chart should formated for context and total format
            cy.get(`#most_used_outfit_stats-section`).contains('Most Used')
            cy.get('#most_used_outfit_stats-section').within(() => {
                cy.get('.apexcharts-canvas').should('exist')
                cy.get('.apexcharts-legend').should('exist')
                cy.get('.apexcharts-xaxis-label title').each(($el) => {
                    cy.wrap($el).invoke('text').then((text) => {
                        const number = parseInt(text.trim(), 10)
                        expect(number).to.be.a('number').and.to.be.at.least(0)
                    })
                })
                cy.get('.apexcharts-yaxis-label title').each(($el) => {
                    cy.wrap($el).invoke('text').then((text) => {
                        const trimmed = text.trim()
                        expect(text).to.not.equal('')
                    })
                })
            });
           
            // Evidence - Step 3
            cy.screenshot(`TC-ST-009_Step-3-${date}`)
        })
    })
})
