import { Command } from 'commander';

import getWidgets from '../../services/widgets/getList';

export default function widgets() {
    const cmd = new Command('list')
        .description('Manage BigCommerce widgets');

    handleWidgets(cmd as Command);
    handleWidgetsTemplates(cmd as Command);

    return cmd;
}

function handleWidgets(cmd: Command) {
    cmd.command('widgets')
        .description('List all widgets with their IDs from BigCommerce')
        .action(async () => {
            await getWidgets('widgets');
        });
}

function handleWidgetsTemplates(cmd: Command) {
    cmd.command('widget-templates')
        .description('List all widget templates with their IDs from BigCommerce')
        .action(async () => {
            await getWidgets('widget-templates');
        });

}
