
export class Redmine {
    constructor() {
        var schedule = require('node-schedule');

        var rule = new schedule.RecurrenceRule();

        rule.minute = new schedule.Range(0, 59, 5);

        schedule.scheduleJob(rule, function () {
            // TODO: Redmine sychronize job (running in 5 minutes)
        });
    }
}