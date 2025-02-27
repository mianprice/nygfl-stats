CREATE DATABASE league_stats; 
\c league_stats
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    level TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE seasons (
    season_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    captain INTEGER NOT NULL REFERENCES users (user_id),
    season_id INTEGER REFERENCES seasons,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    team_id INTEGER REFERENCES teams,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    team_id INTEGER REFERENCES teams (team_id),
    opponent_id INTEGER REFERENCES teams (team_id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    value INTEGER NOT NULL,
    report_id INTEGER REFERENCES reports,
    player_id INTEGER REFERENCES players,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2025 setup
INSERT INTO seasons (name) VALUES ('Fall 2024');
INSERT INTO seasons (name) VALUES ('Sunshine Cup 2025');
INSERT INTO seasons (name) VALUES ('Spring 2025');



INSERT INTO users (name, email, phone) VALUES ('Adam Connaker','aconnaker@gmail.com','6125987136');
INSERT INTO users (name, email, phone) VALUES ('Charlotte Price','charprice6@gmail.com','6783141234');  -- test for player not committed to a season in the system
INSERT INTO users (name, email, phone) VALUES ('Anthony Easter','aeaster2@fordham.edu','9512582697');
INSERT INTO users (name, email, phone) VALUES ('Chris Magoo','cmcgough10@gmail.com','7185942101');
INSERT INTO users (name, email, phone) VALUES ('Christopher Hernandez','thechrishernandez@gmail.com','3477978664');
INSERT INTO users (name, email, phone) VALUES ('Gaurav Shrivastav','gavistav@gmail.com','2025093818');
INSERT INTO users (name, email, phone) VALUES ('Jamar Wilson','jamarwilson212@gmail.com','9142176318');
INSERT INTO users (name, email, phone) VALUES ('Jordan Hamilton','jordanthamilton93@gmail.com','9037677708');
INSERT INTO users (name, email, phone) VALUES ('Justin Bauer','justinbauer10@gmail.com','6084710170');
INSERT INTO users (name, email, phone) VALUES ('Karl Martin','mr.karl.martin@gmail.com','9179925044');
INSERT INTO users (name, email, phone) VALUES ('Kiyon Spencer','kiyon.spencer@gmail.com','9176872024');
INSERT INTO users (name, email, phone) VALUES ('Maximilliam Cabrera','maximilliamcabrera@gmail.com','9084516079');
INSERT INTO users (name, email, phone) VALUES ('PJ Linen','pacer4life31@gmail.com','3472915786');
INSERT INTO users (name, email, phone) VALUES ('Sean Simpson','sean3529@yahoo.com','9142741654');
INSERT INTO users (name, email, phone) VALUES ('Abdu Hytrek','abduhytrek@gmail.com','7737911448');
INSERT INTO users (name, email, phone) VALUES ('Adam Marciano','amarciano72@yahoo.com','9145895961');
INSERT INTO users (name, email, phone) VALUES ('Alex Drakos','jadrakos@gmail.com','2035509557');
INSERT INTO users (name, email, phone) VALUES ('Alex Palombo','alex@palombophotography.com','6463882797');
INSERT INTO users (name, email, phone) VALUES ('Andrew Simpson','asimpson2112@gmail.com','9512120329');
INSERT INTO users (name, email, phone) VALUES ('Brad Becton','bsbecton@gmail.com','9292336572');
INSERT INTO users (name, email, phone) VALUES ('Domenico Aiello','nico.aiello23@gmail.com','8457093297');
INSERT INTO users (name, email, phone) VALUES ('Gabriel McClary','gabrielmcclary@gmail.com','4078646785');
INSERT INTO users (name, email, phone) VALUES ('Joseph Huntenburg','huntenburg.joseph@gmail.com','7322787982');
INSERT INTO users (name, email, phone) VALUES ('Matthew Wessler','mdwessler@gmail.com','7193225280');
INSERT INTO users (name, email, phone) VALUES ('Regan McKendry','reganmc@gmail.com','6314563477');
INSERT INTO users (name, email, phone) VALUES ('Robert Olson','robert.christopher.olson@gmail.com','8583421674');
INSERT INTO users (name, email, phone) VALUES ('Timothy Hart','timothyhart05@gmail.com','3145704298');
INSERT INTO users (name, email, phone) VALUES ('Ali Reza','ar44300@yahoo.com','7038555490');
INSERT INTO users (name, email, phone) VALUES ('Bryan Headley','bryheadley@gmail.com','6145302414');
INSERT INTO users (name, email, phone) VALUES ('Bryan Mullen','brymullen@gmail.com','5165329294');
INSERT INTO users (name, email, phone) VALUES ('James Conheeney','jamesconheeney@gmail.com','2032476577');
INSERT INTO users (name, email, phone) VALUES ('James Valentin','jv786@nyu.edu','7187559759');
INSERT INTO users (name, email, phone) VALUES ('Joseph Schafer','jschafer1310@gmail.com','2156227391');
INSERT INTO users (name, email, phone) VALUES ('Kevin Westerman','kevinwesterman1@gmail.com','5162790837');
INSERT INTO users (name, email, phone) VALUES ('Michael Castor','mgc8088@gmail.com','5163825320');
INSERT INTO users (name, email, phone) VALUES ('Monty Clinton','mtreylor@gmail.com','9178041759');
INSERT INTO users (name, email, phone) VALUES ('Robert D''Agostino','robb.dagostino@gmail.com','7743643448');
INSERT INTO users (name, email, phone) VALUES ('Sean Holihan','stholihan@gmail.com','5714885742');
INSERT INTO users (name, email, phone) VALUES ('Terrell Bostic','terrellbostic@gmail.com','8138334921');
INSERT INTO users (name, email, phone) VALUES ('Timothy Dembo','timothy.dembo@gmail.com','4436180171');
INSERT INTO users (name, email, phone) VALUES ('Aiden Lynds','aiden.lynds@gmail.com','9177690704');
INSERT INTO users (name, email, phone) VALUES ('Alan Cannon','alanfcannon@gmail.com','8083719735');
INSERT INTO users (name, email, phone) VALUES ('Chris Wojton','cjwbaseball21@comcast.net','7245752126');
INSERT INTO users (name, email, phone) VALUES ('Eric Shull','eric.c.shull@gmail.com','7323093233');
INSERT INTO users (name, email, phone) VALUES ('Griffin Joslin','griffinjoslindesign@gmail.com','7742360878');
INSERT INTO users (name, email, phone) VALUES ('Kevin Roth','rothk215@gmail.com','2017835349');
INSERT INTO users (name, email, phone) VALUES ('Marco Lumapas','marcoleelumapas@yahoo.com','9177040704');
INSERT INTO users (name, email, phone) VALUES ('Michael BRANCH','michael.cb.branch@gmail.com','3473366992');
INSERT INTO users (name, email, phone) VALUES ('Paul Jung','pbnjcub@gmail.com','2013201313');
INSERT INTO users (name, email, phone) VALUES ('Quincey Wilson','qtwilson@gmail.com','2026434050');
INSERT INTO users (name, email, phone) VALUES ('Ron Alexander','ronald.a.alexander@gmail.com','4048080637');
INSERT INTO users (name, email, phone) VALUES ('Twan Claiborne','twan.claiborne@gmail.com','8312408199');
INSERT INTO users (name, email, phone) VALUES ('William Martin','williamogilvym@gmail.com','9784710174');
INSERT INTO users (name, email, phone) VALUES ('Alec Hynes','alec.c.hynes@gmail.com','8469145985');
INSERT INTO users (name, email, phone) VALUES ('Amit Anandwala','amit.anandwala@gmail.com','5129238529');
INSERT INTO users (name, email, phone) VALUES ('Brendan Carroll','brendan.carroll444@gmail.com','9177437487');
INSERT INTO users (name, email, phone) VALUES ('Bronson Johnson','bronson.johnson@gmail.com','9173768485');
INSERT INTO users (name, email, phone) VALUES ('Daniel Brennan','dannybrennan91@gmail.com','7032096619');
INSERT INTO users (name, email, phone) VALUES ('Edwin Henry','edwinmauricejr@gmail.com','8182841366');
INSERT INTO users (name, email, phone) VALUES ('Jack OBrien','jack.obrien2795@gmail.com','5169845879');
INSERT INTO users (name, email, phone) VALUES ('Jeremy Grompone','jjg5030@gmail.com','8452397282');
INSERT INTO users (name, email, phone) VALUES ('Jesse Schulman','jesse.schulman86@gmail.com','9145234914');
INSERT INTO users (name, email, phone) VALUES ('Norman Piasecki','1gecko@gmail.com','9178654982');
INSERT INTO users (name, email, phone) VALUES ('Riley Anheluk','ranheluk@gmail.com','5414208751');
INSERT INTO users (name, email, phone) VALUES ('Sean Schroder','sean.schroder@gmail.com','3475316916');
INSERT INTO users (name, email, phone) VALUES ('William Lipovsky','williamlipovsky@gmail.com','7032094621');
INSERT INTO users (name, email, phone) VALUES ('Alex Wilde','awilde@berkeley.edu','9499292507');
INSERT INTO users (name, email, phone) VALUES ('Antonio Carratelli','antonio.carratelli.lmft@gmail.com','5166400226');
INSERT INTO users (name, email, phone) VALUES ('Austin Ostro','awostro@gmail.com','5186052369');
INSERT INTO users (name, email, phone) VALUES ('Eddie Doherty','edward.p.doherty@gmail.com','6302942513');
INSERT INTO users (name, email, phone) VALUES ('Jase Calomadre','jasecalomadre1@gmail.com','9293015702');
INSERT INTO users (name, email, phone) VALUES ('John Balash','johnabalash@gmail.com','8608050932');
INSERT INTO users (name, email, phone) VALUES ('Patrick Elliott','patelliott16@gmail.com','4846827533');
INSERT INTO users (name, email, phone) VALUES ('Patrick LaRocque','patrickxlarocque@gmail.com','5185343397');
INSERT INTO users (name, email, phone) VALUES ('Richard Davis','richard.trow.davis@gmail.com','5307373198');
INSERT INTO users (name, email, phone) VALUES ('Samuel Pelissero','samkoalani@gmail.com','7322727862');
INSERT INTO users (name, email, phone) VALUES ('Scott Bromschwig','scott.h.bromschwig@gmail.com','6312523870');
INSERT INTO users (name, email, phone) VALUES ('Thomas Garza','thomasdgarza@gmail.com','9564663787');
INSERT INTO users (name, email, phone) VALUES ('Tye Javorek','tye.javorek@gmail.com','2163749079');
INSERT INTO users (name, email, phone) VALUES ('Alex Van Pelt','ajvanp01@yahoo.com','9085528250');
INSERT INTO users (name, email, phone) VALUES ('Alfonso Sanchez','alfonsoe.sanchezo@gmail.com','7329832492');
INSERT INTO users (name, email, phone) VALUES ('Dan Smith','danielpatricksmith247@gmail.com','6094254547');
INSERT INTO users (name, email, phone) VALUES ('David Tawil','davidrtawil@gmail.com','7326887297');
INSERT INTO users (name, email, phone) VALUES ('Jorge Mitssunaga','jorgemit206@gmail.com','2019161427');
INSERT INTO users (name, email, phone) VALUES ('Kyle Paxman','kyle.paxman@gmail.com','8017915773');
INSERT INTO users (name, email, phone) VALUES ('Nick Krekeler','nickkrekeler@gmail.com','7203339078');
INSERT INTO users (name, email, phone) VALUES ('Robert Closs','rkawan123@yahoo.com','8607965719');
INSERT INTO users (name, email, phone) VALUES ('stephan benjamin','gallis15swing@gmail.com','7185987795');
INSERT INTO users (name, email, phone) VALUES ('Steven Gong','sgong33@gmail.com','5164761864');
INSERT INTO users (name, email, phone) VALUES ('Steven Tedaldi','tedaldi.steven67@gmail.com','3473018697');
INSERT INTO users (name, email, phone) VALUES ('Will Blyth','wablyth@yahoo.com','6308005493');
INSERT INTO users (name, email, phone) VALUES ('Christian Sutton','christianwadesutton@gmail.com','2673127989');
INSERT INTO users (name, email, phone) VALUES ('Connor Thorpe','cst310@gmail.com','2034510927');
INSERT INTO users (name, email, phone) VALUES ('Dylan Gordon','dygordon02@gmail.com','2012947504');
INSERT INTO users (name, email, phone) VALUES ('Eric Schwartz','eschwartz111@gmail.com','8182160174');
INSERT INTO users (name, email, phone) VALUES ('Jaime Baez','jaime.baez.jr@gmail.com','3476664938');
INSERT INTO users (name, email, phone) VALUES ('Jarrell Canty','jc7576@nyu.edu','9087212120');
INSERT INTO users (name, email, phone) VALUES ('Jerry Xiao','yua.xiao2010@gmail.com','7342625484');
INSERT INTO users (name, email, phone) VALUES ('Libby Fender','rifle1queen@hotmail.com','5093344568');
INSERT INTO users (name, email, phone) VALUES ('Paul Taylor','pdtaylor09@gmail.com','7035545991');
INSERT INTO users (name, email, phone) VALUES ('Peter Geithner','peter.m.geithner@gmail.com','9142741924');
INSERT INTO users (name, email, phone) VALUES ('Piper Styles','piperrstyles@gmail.com','7034316238');
INSERT INTO users (name, email, phone) VALUES ('Rush Milne','rush.milne605@gmail.com','6052703754');
INSERT INTO users (name, email, phone) VALUES ('Steven Rubin','sar434@nyu.edu','9174539939');
INSERT INTO users (name, email, phone) VALUES ('Abdullah Bardak','abdllahbrdk@gmail.com','2018055273');
INSERT INTO users (name, email, phone) VALUES ('Adrion Smooth','adrionhernandez1@gmail.com','5127065055');
INSERT INTO users (name, email, phone) VALUES ('Alberto Altamirano','alberto.a.altamirano@gmail.com','9513759704');
INSERT INTO users (name, email, phone) VALUES ('Darren Major','darrenjmajor@gmail.com','7328224132');
INSERT INTO users (name, email, phone) VALUES ('Justin Friedman-Hurvitz','jfhurvitz@yahoo.com','9143366070');
INSERT INTO users (name, email, phone) VALUES ('Kristopher Burrell','kbryb@yahoo.com','9177012116');
INSERT INTO users (name, email, phone) VALUES ('Kyaire Wynn','kyairewynn9@gmail.com','3022298166');
INSERT INTO users (name, email, phone) VALUES ('Manny Guerrero','guermf1123@yahoo.com','6155572538');
INSERT INTO users (name, email, phone) VALUES ('Nico Pelaschier','ipelaschier@gmail.com','2015607137');
INSERT INTO users (name, email, phone) VALUES ('Patrick Coker','patrickcoker0@gmail.com','8049266037');
INSERT INTO users (name, email, phone) VALUES ('Paul Kuhnle','kuhnlepaul@yahoo.com','6313985310');
INSERT INTO users (name, email, phone) VALUES ('Sean M Dalton','seanmatthewdalton@gmail.com','2033646341');
INSERT INTO users (name, email, phone) VALUES ('William Cuellar','wills2k21@yahoo.com','3479926060');
INSERT INTO users (name, email, phone) VALUES ('Ciaran Reidy','ciaranreidy01@gmail.com','9148069154');
INSERT INTO users (name, email, phone) VALUES ('Daniel Miller','danielspice@gmail.com','2063832776');
INSERT INTO users (name, email, phone) VALUES ('Danny Fan','dannyfan@live.com','6465411752');
INSERT INTO users (name, email, phone) VALUES ('Darren Brown','ddbrownj@gmail.com','6028824883');
INSERT INTO users (name, email, phone) VALUES ('Drew Carr','drewbcarr@gmail.com','7138991929');
INSERT INTO users (name, email, phone) VALUES ('Duane Griffith','griffduane@gmail.com','3475025765');
INSERT INTO users (name, email, phone) VALUES ('Fernando Zaragoza','nandozaragoza@gmail.com','3472600108');
INSERT INTO users (name, email, phone) VALUES ('Grady Schutt 07','gradyschutt@gmail.com','5672772478');
INSERT INTO users (name, email, phone) VALUES ('Joshua Smalley','jsmalley205@yahoo.com','2055345568');
INSERT INTO users (name, email, phone) VALUES ('Keenan McAuliffe','keenmac13@gmail.com','2017045955');
INSERT INTO users (name, email, phone) VALUES ('Michael Mogavero','mogavero80@gmail.com','5163167978');
INSERT INTO users (name, email, phone) VALUES ('Peter Demoise','pdemoise@gmail.com','4127207463');
INSERT INTO users (name, email, phone) VALUES ('Steven Grant','stevenjgrant5@gmail.com','9145890498');
INSERT INTO users (name, email, phone) VALUES ('Anthony DErrico','ard1124@aol.com','9086254820');
INSERT INTO users (name, email, phone) VALUES ('Christian Vazquez','cgv2013@gmail.com','3056065334');
INSERT INTO users (name, email, phone) VALUES ('Christopher Scalone','chrisscalone97@gmail.com','6315215420');
INSERT INTO users (name, email, phone) VALUES ('David Booth','boothd3@gmail.com','7039550506');
INSERT INTO users (name, email, phone) VALUES ('Eric Lippin','eric.lippin@gmail.com','3478801207');
INSERT INTO users (name, email, phone) VALUES ('James Riedel','sqnt10@hotmail.com','7165722751');
INSERT INTO users (name, email, phone) VALUES ('John McAllister','jmac00016@gmail.com','2039621429');
INSERT INTO users (name, email, phone) VALUES ('Jonathan Fitzgerald','fitzgeraldj522@gmail.com','7329860852');
INSERT INTO users (name, email, phone) VALUES ('Jordan Lockett','jordyycat93@gmail.com','2146686586');
INSERT INTO users (name, email, phone) VALUES ('Jordan Taylor','jordankeitaylor27@gmail.com','9737689820');
INSERT INTO users (name, email, phone) VALUES ('Max Italiaander','overactiv@icloud.com','8609211866');
INSERT INTO users (name, email, phone) VALUES ('Michael McAree','michael.mcaree@nyulangone.org','8482188180');
INSERT INTO users (name, email, phone) VALUES ('Tejesh Patel','tkpatel31@yahoo.com','7325168339');
INSERT INTO users (name, email, phone) VALUES ('Ari Pena','aricarlospena@gmail.com','5166593024');
INSERT INTO users (name, email, phone) VALUES ('Brendan McCullagh','brendan.p.mccullagh@gmail.com','2013007752');
INSERT INTO users (name, email, phone) VALUES ('Daniel Lofrese','daniel.lofrese@gmail.com','5164576243');
INSERT INTO users (name, email, phone) VALUES ('Ian Price','michael.ian.price@gmail.com','7706053596');
INSERT INTO users (name, email, phone) VALUES ('Marissa Ware','marissa.d.ware@gmail.com','7123104324');
INSERT INTO users (name, email, phone) VALUES ('Max Corrales','corrales7m@gmail.com','9146108438');
INSERT INTO users (name, email, phone) VALUES ('Menachem Freeman','menach8@gmail.com','3478280615');
INSERT INTO users (name, email, phone) VALUES ('Mitch Scuzzarella','scuzzarellam@gmail.com','5082546252');
INSERT INTO users (name, email, phone) VALUES ('Nick Brenner','nickbrenner412@gmail.com','9732246393');
INSERT INTO users (name, email, phone) VALUES ('Parker Unruh','parker.unruh@gmail.com','5034753276');
INSERT INTO users (name, email, phone) VALUES ('Scott Olivo','spolivo23@gmail.com','7743642591');
INSERT INTO users (name, email, phone) VALUES ('Thomas McNamara','tmcnamara28@gmail.com','2039829910');
INSERT INTO users (name, email, phone) VALUES ('Tyler Comas','tjcomas@gmail.com','8455452295');
INSERT INTO users (name, email, phone) VALUES ('Adam Robbins','adamprobbins@gmail.com','7818209778');
INSERT INTO users (name, email, phone) VALUES ('Bryan Valerio','bryanv60@gmail.com','9087648859');
INSERT INTO users (name, email, phone) VALUES ('Bryce Tapscott','bctapscott@gmail.com','8437358669');
INSERT INTO users (name, email, phone) VALUES ('Edward Lee','eddleeglobal@gmail.com','6462475224');
INSERT INTO users (name, email, phone) VALUES ('Gregory Romer','gregorygromer@gmail.com','9084004469');
INSERT INTO users (name, email, phone) VALUES ('Hajir Dilmanian','dilmanianh@gmail.com','3478615802');
INSERT INTO users (name, email, phone) VALUES ('Ian Donovan','iandnvn@gmail.com','4108027218');
INSERT INTO users (name, email, phone) VALUES ('Jared Reyes','j.rosenblumreyes@gmail.com','8456249123');
INSERT INTO users (name, email, phone) VALUES ('Kevin Garcia','kg.gar91@gmail.com','3017898706');
INSERT INTO users (name, email, phone) VALUES ('Nicholas Pei','njpei@yahoo.com','3473063301');
INSERT INTO users (name, email, phone) VALUES ('Pablo Heredia','kainirmo@me.com','8036228699');
INSERT INTO users (name, email, phone) VALUES ('Patrick Maiden','patmaiden@gmail.com','2153176331');
INSERT INTO users (name, email, phone) VALUES ('Robert Smith','rps271@gmail.com','7818126441');
INSERT INTO users (name, email, phone) VALUES ('Charles Maher','charles0maher@gmail.com','8025780820');
INSERT INTO users (name, email, phone) VALUES ('Connor Cyrus','ccy1387@gmail.com','6033069390');
INSERT INTO users (name, email, phone) VALUES ('Deane Sullivan','deanesullivan18@gmail.com','6173356702');
INSERT INTO users (name, email, phone) VALUES ('Dennis Michel','dmichel1988@gmail.com','6468422867');
INSERT INTO users (name, email, phone) VALUES ('Donald Vinson','donaldmvinson@gmail.com','3013464401');
INSERT INTO users (name, email, phone) VALUES ('Jack Lamb','jacklamb45@gmail.com','2152722324');
INSERT INTO users (name, email, phone) VALUES ('Jerrell Price','jerrellprice08@gmail.com','8165476509');
INSERT INTO users (name, email, phone) VALUES ('Kameron Serrano','kjserrano24@gmail.com','9087644644');
INSERT INTO users (name, email, phone) VALUES ('Matthew Benemerito','matt.benemerito@gmail.com','9739450719');
INSERT INTO users (name, email, phone) VALUES ('Matthew Macca','matthewtmacca@gmail.com','8603058915');
INSERT INTO users (name, email, phone) VALUES ('Michael Giuggio','mgiuggio@gmail.com','6178168707');
INSERT INTO users (name, email, phone) VALUES ('Nicolas Casaula','nic.casaula@gmail.com','6313553719');
INSERT INTO users (name, email, phone) VALUES ('Victor Ortiz','victorlortiz23@gmail.com','3477121648');
INSERT INTO users (name, email, phone) VALUES ('Andom Ghebreghiorgis','andomgheb@gmail.com','9178869278');
INSERT INTO users (name, email, phone) VALUES ('Andre Vasilyev','andrevasilyev@gmail.com','3109069838');
INSERT INTO users (name, email, phone) VALUES ('Brinton Williams','brintonkwilliams@gmail.com','6264875360');
INSERT INTO users (name, email, phone) VALUES ('Bryan Ortiz-VanEvery','bryanort1987@gmail.com','6314690258');
INSERT INTO users (name, email, phone) VALUES ('Deej Johnson','denoriusjohnson@gmail.com','4042639349');
INSERT INTO users (name, email, phone) VALUES ('Jake Snyder','jakemsnyder2@gmail.com','3014121435');
INSERT INTO users (name, email, phone) VALUES ('Jeff Dingfelder','jeffdingy@gmail.com','4406230241');
INSERT INTO users (name, email, phone) VALUES ('John Paul Detty','neworleanz1982@aim.com','5046065425');
INSERT INTO users (name, email, phone) VALUES ('Joseph Curry','joe.curry86@gmail.com','9178323778');
INSERT INTO users (name, email, phone) VALUES ('Michael DiCaro','michael.dicaro10@gmail.com','9733092296');
INSERT INTO users (name, email, phone) VALUES ('Michael Orlando','michael2021orlando@gmail.com','7186190506');
INSERT INTO users (name, email, phone) VALUES ('Michael Wellbrock','michaeljwellbrock@gmail.com','6313388798');
INSERT INTO users (name, email, phone) VALUES ('Seb Emin','seb.emin@gmail.com','5513399292');
INSERT INTO users (name, email, phone) VALUES ('Augusto Penaranda','guspuche@gmail.com','8622030391');
INSERT INTO users (name, email, phone) VALUES ('Brian DeGrazia','brian.degrazia@gmail.com','9179821226');
INSERT INTO users (name, email, phone) VALUES ('Dan Dimant','dimant823@gmail.com','9175395374');
INSERT INTO users (name, email, phone) VALUES ('Eric James','ecjames85@gmail.com','5165576873');
INSERT INTO users (name, email, phone) VALUES ('Frank Krumrie','fkrumrie@yahoo.com','9734763374');
INSERT INTO users (name, email, phone) VALUES ('Hector Garza','hgarza10@gmail.com','4093921535');
INSERT INTO users (name, email, phone) VALUES ('Jon Mark Ponder','jonmarkponder@gmail.com','3343325751');
INSERT INTO users (name, email, phone) VALUES ('Matt Broderick','mjbroderi@gmail.com','4136279932');
INSERT INTO users (name, email, phone) VALUES ('Mike Conway','jmc1211@gmail.com','9193608847');
INSERT INTO users (name, email, phone) VALUES ('Rory Ray','roryray@roryray.com','3103833151');
INSERT INTO users (name, email, phone) VALUES ('Stephen Torres','stephenanthonytorres@gmail.com','9292920391');
INSERT INTO users (name, email, phone) VALUES ('Stuart Reichenberger','sjreichenberger@gmail.com','3165009255');
INSERT INTO users (name, email, phone) VALUES ('Vincent Maniscalco','vmaniscalcojr@gmail.com','8453254019');

INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Ian Price'),'admin');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Steven Grant'),'admin');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Quincey Wilson'),'admin');


INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Adam Connaker'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Joseph Huntenburg'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Kevin Westerman'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Eric Shull'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Jeremy Grompone'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'John Balash'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'David Tawil'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Jaime Baez'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Darren Major'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Daniel Miller'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'James Riedel'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Brendan McCullagh'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Ian Donovan'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Jack Lamb'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'John Paul Detty'),'captain');
INSERT INTO permissions (user_id, level) VALUES ((SELECT user_id FROM users WHERE name = 'Vincent Maniscalco'),'captain');

INSERT INTO teams (name, captain, season_id) VALUES ('Boxers',(SELECT user_id FROM users WHERE name = 'Adam Connaker'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Dickens',(SELECT user_id FROM users WHERE name = 'Joseph Huntenburg'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Eagle',(SELECT user_id FROM users WHERE name = 'Kevin Westerman'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Elevated Health',(SELECT user_id FROM users WHERE name = 'Eric Shull'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Flex',(SELECT user_id FROM users WHERE name = 'Jeremy Grompone'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Gym Bar',(SELECT user_id FROM users WHERE name = 'John Balash'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Hardware',(SELECT user_id FROM users WHERE name = 'David Tawil'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Hush',(SELECT user_id FROM users WHERE name = 'Jaime Baez'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Industry',(SELECT user_id FROM users WHERE name = 'Darren Major'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Playhouse',(SELECT user_id FROM users WHERE name = 'Daniel Miller'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Red Stache',(SELECT user_id FROM users WHERE name = 'James Riedel'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Rise',(SELECT user_id FROM users WHERE name = 'Brendan McCullagh'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Rockbar',(SELECT user_id FROM users WHERE name = 'Ian Donovan'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Stonewall',(SELECT user_id FROM users WHERE name = 'Jack Lamb'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Vers',(SELECT user_id FROM users WHERE name = 'John Paul Detty'),1);
INSERT INTO teams (name, captain, season_id) VALUES ('Vice Versa',(SELECT user_id FROM users WHERE name = 'Vincent Maniscalco'),1);

-- INSERT INTO players (user_id, team_id) VALUES ()

INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Adam Connaker'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Anthony Easter'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Chris Magoo'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Christopher Hernandez'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Gaurav Shrivastav'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jamar Wilson'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jordan Hamilton'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Justin Bauer'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Karl Martin'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kiyon Spencer'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Maximilliam Cabrera'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='PJ Linen'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Sean Simpson'), (SELECT team_id FROM teams WHERE name='Boxers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Abdu Hytrek'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Adam Marciano'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alex Drakos'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alex Palombo'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Andrew Simpson'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Brad Becton'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Domenico Aiello'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Gabriel McClary'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Joseph Huntenburg'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Matthew Wessler'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Regan McKendry'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Robert Olson'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Timothy Hart'), (SELECT team_id FROM teams WHERE name='Dickens'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Ali Reza'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Bryan Headley'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Bryan Mullen'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='James Conheeney'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='James Valentin'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Joseph Schafer'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kevin Westerman'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael Castor'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Monty Clinton'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Robert D''Agostino'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Sean Holihan'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Terrell Bostic'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Timothy Dembo'), (SELECT team_id FROM teams WHERE name='Eagle'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Aiden Lynds'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alan Cannon'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Chris Wojton'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Eric Shull'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Griffin Joslin'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kevin Roth'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Marco Lumapas'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael BRANCH'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Paul Jung'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Quincey Wilson'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Ron Alexander'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Twan Claiborne'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='William Martin'), (SELECT team_id FROM teams WHERE name='Elevated Health'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alec Hynes'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Amit Anandwala'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Brendan Carroll'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Bronson Johnson'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Daniel Brennan'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Edwin Henry'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jack OBrien'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jeremy Grompone'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jesse Schulman'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Norman Piasecki'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Riley Anheluk'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Sean Schroder'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='William Lipovsky'), (SELECT team_id FROM teams WHERE name='Flex'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alex Wilde'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Antonio Carratelli'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Austin Ostro'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Eddie Doherty'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jase Calomadre'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='John Balash'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Patrick Elliott'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Patrick LaRocque'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Richard Davis'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Samuel Pelissero'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Scott Bromschwig'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Thomas Garza'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Tye Javorek'), (SELECT team_id FROM teams WHERE name='Gym Bar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alex Van Pelt'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alfonso Sanchez'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Dan Smith'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='David Tawil'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jorge Mitssunaga'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kyle Paxman'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Nick Krekeler'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Robert Closs'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='stephan benjamin'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Steven Gong'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Steven Tedaldi'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Will Blyth'), (SELECT team_id FROM teams WHERE name='Hardware'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Christian Sutton'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Connor Thorpe'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Dylan Gordon'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Eric Schwartz'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jaime Baez'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jarrell Canty'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jerry Xiao'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Libby Fender'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Paul Taylor'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Peter Geithner'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Piper Styles'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Rush Milne'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Steven Rubin'), (SELECT team_id FROM teams WHERE name='Hush'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Abdullah Bardak'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Adrion Smooth'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Alberto Altamirano'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Darren Major'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Justin Friedman-Hurvitz'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kristopher Burrell'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kyaire Wynn'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Manny Guerrero'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Nico Pelaschier'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Patrick Coker'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Paul Kuhnle'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Sean M Dalton'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='William Cuellar'), (SELECT team_id FROM teams WHERE name='Industry'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Ciaran Reidy'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Daniel Miller'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Danny Fan'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Darren Brown'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Drew Carr'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Duane Griffith'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Fernando Zaragoza'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Grady Schutt 07'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Joshua Smalley'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Keenan McAuliffe'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael Mogavero'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Peter Demoise'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Steven Grant'), (SELECT team_id FROM teams WHERE name='Playhouse'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Anthony DErrico'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Christian Vazquez'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Christopher Scalone'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='David Booth'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Eric Lippin'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='James Riedel'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='John McAllister'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jonathan Fitzgerald'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jordan Lockett'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jordan Taylor'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Max Italiaander'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael McAree'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Tejesh Patel'), (SELECT team_id FROM teams WHERE name='Red Stache'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Ari Pena'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Brendan McCullagh'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Daniel Lofrese'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Ian Price'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Marissa Ware'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Max Corrales'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Menachem Freeman'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Mitch Scuzzarella'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Nick Brenner'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Parker Unruh'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Scott Olivo'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Thomas McNamara'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Tyler Comas'), (SELECT team_id FROM teams WHERE name='Rise'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Adam Robbins'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Bryan Valerio'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Bryce Tapscott'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Edward Lee'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Gregory Romer'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Hajir Dilmanian'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Ian Donovan'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jared Reyes'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kevin Garcia'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Nicholas Pei'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Pablo Heredia'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Patrick Maiden'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Robert Smith'), (SELECT team_id FROM teams WHERE name='Rockbar'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Charles Maher'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Connor Cyrus'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Deane Sullivan'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Dennis Michel'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Donald Vinson'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jack Lamb'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jerrell Price'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Kameron Serrano'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Matthew Benemerito'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Matthew Macca'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael Giuggio'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Nicolas Casaula'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Victor Ortiz'), (SELECT team_id FROM teams WHERE name='Stonewall'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Andom Ghebreghiorgis'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Andre Vasilyev'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Brinton Williams'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Bryan Ortiz-VanEvery'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Deej Johnson'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jake Snyder'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jeff Dingfelder'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='John Paul Detty'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Joseph Curry'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael DiCaro'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael Orlando'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Michael Wellbrock'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Seb Emin'), (SELECT team_id FROM teams WHERE name='Vers'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Augusto Penaranda'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Brian DeGrazia'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Dan Dimant'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Eric James'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Frank Krumrie'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Hector Garza'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Jon Mark Ponder'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Matt Broderick'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Mike Conway'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Rory Ray'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Stephen Torres'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Stuart Reichenberger'), (SELECT team_id FROM teams WHERE name='Vice Versa'));
INSERT INTO players (user_id, team_id) VALUES ((SELECT user_id FROM users WHERE name='Vincent Maniscalco'), (SELECT team_id FROM teams WHERE name='Vice Versa'));




