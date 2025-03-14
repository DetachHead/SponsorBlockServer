import fetch from 'node-fetch';
import {Done, getbaseURL} from '../utils';
import {db} from '../../src/databases/databases';
import {getHash} from '../../src/utils/getHash';

describe('postClearCache', () => {
    before(async () => {
        await db.prepare("run", `INSERT INTO "vipUsers" ("userID") VALUES ('` + getHash("clearing-vip") + "')");
        let startOfQuery = 'INSERT INTO "sponsorTimes" ("videoID", "startTime", "endTime", "votes", "UUID", "userID", "timeSubmitted", views, category, "shadowHidden", "hashedVideoID") VALUES';
        await db.prepare("run", startOfQuery + "('clear-test', 0, 1, 2, 'clear-uuid', 'testman', 0, 50, 'sponsor', 0, '" + getHash('clear-test', 1) + "')");
    });

    it('Should be able to clear cache for existing video', (done: Done) => {
        fetch(getbaseURL()
            + "/api/clearCache?userID=clearing-vip&videoID=clear-test", {
            method: 'POST'
        })
        .then(res => {
            if (res.status === 200) done();
            else done("Status code was " + res.status);
        })
        .catch(err => done(err));
    });

    it('Should be able to clear cache for nonexistent video', (done: Done) => {
        fetch(getbaseURL()
            + "/api/clearCache?userID=clearing-vip&videoID=dne-video", {
            method: 'POST'
        })
        .then(res => {
            if (res.status === 200) done();
            else done("Status code was " + res.status);
        })
        .catch(err => done(err));
    });

    it('Should get 403 as non-vip', (done: Done) => {
        fetch(getbaseURL()
            + "/api/clearCache?userID=regular-user&videoID=clear-tes", {
            method: 'POST'
        })
        .then(async res => {
            if (res.status !== 403) done('non 403 (' + res.status + ')');
            else done(); // pass
        })
        .catch(err => done(err));
    });

    it('Should give 400 with missing videoID', (done: Done) => {
        fetch(getbaseURL()
            + "/api/clearCache?userID=clearing-vip", {
            method: 'POST'
        })
        .then(async res => {
            if (res.status !== 400) done('non 400 (' + res.status + ')');
            else done(); // pass
        })
        .catch(err => done(err));
    });

    it('Should give 400 with missing userID', (done: Done) => {
        fetch(getbaseURL()
            + "/api/clearCache?userID=clearing-vip", {
            method: 'POST'
        })
        .then(async res => {
            if (res.status !== 400) done('non 400 (' + res.status + ')');
            else done(); // pass
        })
        .catch(err => done(err));
    });
});
