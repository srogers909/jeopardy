let componentTemplate = `
    <section></section>
`;

import '../styles/main.less'

class HomeComponent {
    constructor($log) {
        $log.info('Home Component initialized');
    }

    startGame() {

    }
}

HomeComponent.$inject = ['$log'];

export default {
    bindings: {},
    controller: HomeComponent,
    template: componentTemplate
};
