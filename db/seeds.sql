USE build_tracker;


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


