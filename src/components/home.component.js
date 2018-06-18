let componentTemplate = ``;

import '../styles/main.less'

class HomeComponent {
    constructor($log) {
        $log.info('Home Component initialized');
    }
}

HomeComponent.$inject = ['$log'];

export default {
    bindings: {},
    controller: HomeComponent,
    template: componentTemplate
};
