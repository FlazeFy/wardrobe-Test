// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-WS-001 - Wash', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Wash Summary', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Wash"
            cy.contains('a','Wash').click()
            cy.url().should('include', '/clothes/wash')
                        
            // Step 3: In the section "Wash Summary", you can find Avg. Wash / Week, Avg. Wash Duration / Clothes, Total Wash, Most Wash, and Last Wash
            cy.get(`#wash_summary-section`).contains('Wash Summary')

            cy.get(`#avg_wash_week-section`).contains('Avg. Wash / Week')
            cy.get('#avg_wash_week-section').within(() => {
                cy.contains('Avg. Wash / Week')
                cy.get('h1').invoke('text').then((text) => {
                    expect(parseFloat(text)).to.be.a('number')
                })
                cy.get('h4').should('contain.text', 'Clothes')
            })              
            cy.get('#avg_wash_duration_clothes-section').within(() => {
                cy.contains('Avg. Wash Duration / Clothes')
                cy.get('h1').invoke('text').then((text) => {
                    const trimmed = text.trim()
                    expect(trimmed).to.satisfy(t => t === '-' || t.includes('Days'))
                })            
                cy.get('h4').invoke('text').then((text) => {
                    const trimmed = text.trim()
                    if (trimmed !== '') {
                        expect(trimmed).to.include('hr')
                    }
                })
            })
            cy.get('#total_wash-section').within(() => {
                cy.contains('Total Wash')
                cy.get('h1').invoke('text').then((text) => {
                    expect(parseFloat(text)).to.be.a('number')
                })
                cy.get('h4').should('contain.text', 'Clothes')
            })   
            cy.get('#most_wash-section').within(() => {
                cy.contains('Most Wash')
                cy.get('h3').invoke('text').then((text) => {
                    expect(text.trim()).to.not.equal('')
                })
            })   
            cy.get('#last_wash-section').within(() => {
                cy.contains('Last Wash')
                cy.get('h3').invoke('text').then((text) => {
                    expect(text.trim()).to.not.equal('')
                })
                cy.get('h5').invoke('text').then((text) => {
                    const trimmed = text.trim()
                    expect(trimmed).to.not.equal('')
                    expect(trimmed).to.include('on')
                })
            })

            // Evidence - Step 3
            cy.screenshot(`TC-WS-001_Step-3-${date}`)
        })
    })
})
