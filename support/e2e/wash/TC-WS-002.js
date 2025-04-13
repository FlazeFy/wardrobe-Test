// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-WS-002 - Wash', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See History of Wash', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Wash"
            cy.contains('a','Wash').click()
            cy.url().should('include', '/clothes/wash')
                        
            // Step 3: In the section "History Of Wash", you can find list of wash history that contain clothes name, clothes type, merk, made of, wash notes, wash type, and checkpoint
            cy.get(`#history_of_wash_list-section`).contains('History Of Wash')
            cy.get('#history_of_wash_list-section .wash-box').each(($el) => {
                // Clothes Name
                cy.wrap($el).find('h4').invoke('text').should('not.be.empty')
            
                // Clothes Type
                cy.wrap($el).find('.btn-type').invoke('text').should('not.be.empty')
            
                // Clothes Merk
                cy.wrap($el).find('.btn-merk').invoke('text').should('not.be.empty')
            
                // Clothes Made From
                cy.wrap($el).find('.btn-made-from').invoke('text').should('not.be.empty')
            
                // Clothes Wash Notes
                cy.wrap($el).find('p').first().invoke('text').then((text) => {
                    const trimmed = text.trim()
                    expect(trimmed).to.satisfy(t => t === '- No Notes Provided -' || t.length > 0)
                })                
            
                // Wash At
                cy.wrap($el).find('h6').invoke('text').should('include', 'Wash at')
            
                // Wash Checkpoint
                cy.wrap($el).contains('Checkpoint :')
                cy.wrap($el).find('p').last().invoke('text').should('not.be.empty')
            })

            // Evidence - Step 3
            cy.screenshot(`TC-WS-002_Step-3-${date}`)
        })
    })
})
