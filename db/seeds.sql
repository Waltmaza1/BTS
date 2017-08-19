USE build_tracker;

insert into users (first_name, last_name, email, pword, street, city, state, zip_code, phone_number, access)
values ("Tyrone", "Smiley", "freemyppl@gmail.com", "ts123", "123 Main St.", "Dallas", "TX", "75219", "21455551212", "1");

insert into users (first_name, last_name, email, pword, street, city, state, zip_code, phone_number, access)
values ("Robert", "Weitman", "happy@gmail.com", "rw123", "123 Main St.", "Dallas", "TX", "75219", "21455551212", "1");

insert into users (first_name, last_name, email, pword, street, city, state, zip_code, phone_number, access)
values ("Walter", "Mazariego", "wallyl@gmail.com", "wm123", "123 Main St.", "Dallas", "TX", "75219", "21455551212", "1");

insert into users (first_name, last_name, email, pword, street, city, state, zip_code, phone_number, access)
values ("Nithya", "Sam", "nithya@gmail.com", "ns123", "123 Main St.", "Dallas", "TX", "75219", "21455551212", "1");

insert into users (first_name, last_name, email, pword, street, city, state, zip_code, phone_number, access)
values ("Matt", "Vella", "mv@gmail.com", "mv123", "123 Main St.", "Dallas", "TX", "75219", "21455551212", "1");

insert into users (first_name, last_name, email, pword, street, city, state, zip_code, phone_number, access)
values ("Collin", "McDonell", "collin@gmail.com", "cm123", "123 Main St.", "Dallas", "TX", "75219", "21455551212", "1");

***Product SEEDS


insert into products (sku, product_name, description)
values ("ABC123", "Alpha1000", "13' Laptop with OLED Display");

insert into products (sku, product_name, description)
values ("LMN123", "Beta2000", "15' Laptop with Passive Display");

insert into products (sku, product_name, description)
values ("XYZ123", "Omega3000", "17' Laptop with Dual OLED Display");


***Stations SEEDS

insert into stations (station_name, description)
values ("Warehouse","Pull and Process open orders for shipping");

insert into stations (station_name, description)
values ("Quality","Complete Quality Inspection before shipping");

insert into stations (station_name, description)
values ("Shipping","Process order for final shipment");


***Kits SEEDS
	SKU ABC123
insert into kits (serial_id, sku)
values ("45590995", "1");

insert into kits (serial_id, sku)
values ("11945637", "1");

insert into kits (serial_id, sku)
values ("85911900", "1");

insert into kits (serial_id, sku)
values ("99981255", "1");

insert into kits (serial_id, sku)
values ("47067404", "1");

	SKU LMN123
insert into kits (serial_id, sku)
values ("15245549", "2");

insert into kits (serial_id, sku)
values ("60047620", "2");

insert into kits (serial_id, sku)
values ("26023396", "2");

insert into kits (serial_id, sku)
values ("78527592", "2");

insert into kits (serial_id, sku)
values ("89629860", "2");

	SKU XYZ123
insert into kits (serial_id, sku)
values ("88250412", "3");

insert into kits (serial_id, sku)
values ("28040380", "3");

insert into kits (serial_id, sku)
values ("11040830", "3");

insert into kits (serial_id, sku)
values ("38103918", "3");

insert into kits (serial_id, sku)
values ("31102082", "3");


***Orders SEEDS

insert into orders (user_id, station_completed, shipped_flag, date_created, sku)
values ("1", "0", "0", NOW(), "3");