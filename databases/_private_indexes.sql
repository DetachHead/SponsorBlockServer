-- sponsorTimes

CREATE INDEX IF NOT EXISTS "sponsorTimes_hashedIP"
    ON public."sponsorTimes" USING btree
    ("hashedIP" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS "privateDB_sponsorTimes_videoID"
    ON public."sponsorTimes" USING btree
    ("videoID" ASC NULLS LAST)
;

-- votes

CREATE INDEX IF NOT EXISTS "votes_userID"
    ON public.votes USING btree
    ("UUID" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- shadowBannedUsers

CREATE INDEX IF NOT EXISTS "shadowBannedUsers_index"
    ON public."shadowBannedUsers" USING btree
    ("userID" COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

-- categoryVotes

CREATE INDEX IF NOT EXISTS "categoryVotes_UUID"
    ON public."categoryVotes" USING btree
    ("UUID" COLLATE pg_catalog."default" ASC NULLS LAST, "userID" COLLATE pg_catalog."default" ASC NULLS LAST, "hashedIP" COLLATE pg_catalog."default" ASC NULLS LAST, category COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;