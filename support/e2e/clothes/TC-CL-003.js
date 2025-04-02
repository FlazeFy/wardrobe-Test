// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-003 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Clothes Type Summary', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')
            
            // Step 2: After section with title "All Types", there will be list of clothes type and total clothes per type
            cy.get('h1').contains('All Types')
            cy.get('#clothes_type_summary-holder h4').each($el => {
                // Clothes Category Total
                cy.wrap($el).find('b').should('exist').invoke('text').then((text) => {
                    const number = parseInt(text.trim(), 10)
                    expect(number).to.be.a('number').and.to.be.greaterThan(0)
                })

                const clothes_types = [
                    'hat', 'pants', 'shirt', 'jacket', 'shoes', 'socks', 'scarf', 'gloves', 'shorts', 'skirt', 'dress', 'blouse', 'sweater', 'hoodie', 'tie', 'belt', 
                    'coat', 'underwear', 'swimsuit', 'vest', 't-shirt', 'jeans', 'leggings', 'boots', 'sandals', 'sneakers', 'raincoat', 'poncho', 'cardigan'
                ]
                // Clothes Type
                cy.wrap($el).invoke('html').then((html) => {
                    const textWithoutTotal = html.replace(/<b>.*?<\/b>/g, '').trim().toLowerCase()
                    const hasValidType = clothes_types.some(type => textWithoutTotal.includes(type))
                    expect(hasValidType).to.be.true
                })
            })

            // Evidence - Step 2
            cy.screenshot(`TC-CL-003_Step-2-${date}`)
        })
    })
})
