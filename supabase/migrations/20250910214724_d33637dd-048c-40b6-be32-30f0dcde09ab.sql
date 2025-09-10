-- Populate categories table with real data
INSERT INTO public.categories (name, slug, description, image_url, active) VALUES 
('Action Figures', 'action-figures', 'Figuras de ação colecionáveis de diversas franquias populares como Star Wars, Transformers e He-Man', 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Bichinhos de Pelúcia', 'pelucias', 'Pelúcias vintage e modernas, incluindo ursos Steiff e personagens licenciados', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Jogos de Tabuleiro', 'jogos-tabuleiro', 'Jogos clássicos vintage e edições especiais para colecionadores', 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Videogames Retrô', 'videogames-retro', 'Consoles vintage, cartuchos raros e acessórios de várias gerações de videogames', 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Blocos de Montar', 'blocos-montar', 'Sets vintage de Lego, Mega Construx e outras marcas colecionáveis', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Carrinhos Vintage', 'carrinhos-vintage', 'Hot Wheels, Matchbox e outras miniaturas de veículos colecionáveis', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Personagens Nintendo', 'nintendo', 'Brinquedos e figuras de personagens clássicos da Nintendo como Mario, Luigi e Pokémon', 'https://images.unsplash.com/photo-1578305682257-676e77f43ede?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true),
('Bonecas Vintage', 'bonecas-vintage', 'Barbies antigas, bonecas de porcelana e outros itens colecionáveis para bonequeiras', 'https://images.unsplash.com/photo-1578662996442-48f18103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', true);

-- Get category IDs for products insertion
DO $$
DECLARE
    action_figures_id uuid;
    pelucias_id uuid;
    jogos_id uuid;
    videogames_id uuid;
    nintendo_id uuid;
    bonecas_id uuid;
    carrinhos_id uuid;
    blocos_id uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO action_figures_id FROM categories WHERE slug = 'action-figures';
    SELECT id INTO pelucias_id FROM categories WHERE slug = 'pelucias';
    SELECT id INTO jogos_id FROM categories WHERE slug = 'jogos-tabuleiro';
    SELECT id INTO videogames_id FROM categories WHERE slug = 'videogames-retro';
    SELECT id INTO nintendo_id FROM categories WHERE slug = 'nintendo';
    SELECT id INTO bonecas_id FROM categories WHERE slug = 'bonecas-vintage';
    SELECT id INTO carrinhos_id FROM categories WHERE slug = 'carrinhos-vintage';
    SELECT id INTO blocos_id FROM categories WHERE slug = 'blocos-montar';

    -- Insert products with real data
    INSERT INTO public.products (name, description, price, image_url, category_id, stock_quantity, featured, active, tags) VALUES 
    ('Boneco Star Wars Luke Skywalker Vintage', 'Boneco original do Luke Skywalker da primeira coleção Star Wars de 1977, na embalagem original lacrada', 1299.90, 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', action_figures_id, 2, true, true, ARRAY['star wars', 'vintage', 'lacrado', 'colecionável']),
    ('Urso de Pelúcia Steiff Antigo', 'Urso de pelúcia Steiff dos anos 50 com etiqueta original, peça de colecionador alemã autêntica', 890.50, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', pelucias_id, 1, true, true, ARRAY['steiff', 'vintage', 'alemão', 'colecionável']),
    ('Jogo Banco Imobiliário Estrela 1944', 'Primeira edição brasileira do Banco Imobiliário da Estrela de 1944, caixa original preservada', 650.00, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', jogos_id, 1, true, true, ARRAY['estrela', '1944', 'primeira edição', 'brasileiro']),
    ('Console Nintendo Famicom Original', 'Console Nintendo Famicom japonês de 1983, funcionando perfeitamente com controles originais', 1890.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', videogames_id, 1, true, true, ARRAY['nintendo', 'famicom', 'japonês', '1983']),
    ('Boneca Barbie #1 Loira Ponytail 1959', 'Primeira Barbie da Mattel de 1959, cabelo loiro ponytail, rosto pálido, item extremamente raro', 8500.00, 'https://images.unsplash.com/photo-1578662996442-48f18103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', bonecas_id, 1, true, true, ARRAY['barbie', '1959', 'primeira', 'mattel', 'raro']),
    ('Action Figure Super Mario Bros Nintendo', 'Figure oficial do Super Mario Bros da Nintendo, articulado, com acessórios removíveis', 189.90, 'https://images.unsplash.com/photo-1578305682257-676e77f43ede?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', nintendo_id, 12, false, true, ARRAY['mario', 'nintendo', 'articulado']),
    ('Pelúcia Luigi Original Nintendo', 'Pelúcia oficial do Luigi da Nintendo, material de alta qualidade, licenciada', 149.90, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', nintendo_id, 8, false, true, ARRAY['luigi', 'nintendo', 'pelúcia', 'oficial']),
    ('Princesa Peach Amiibo Gold Edition', 'Amiibo dourado da Princesa Peach, edição limitada, lacrado na embalagem original', 599.90, 'https://images.unsplash.com/photo-1574811222540-ce97cb12b8ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', nintendo_id, 3, true, true, ARRAY['amiibo', 'peach', 'dourado', 'limitado']),
    ('Transformer Optimus Prime G1 1984', 'Optimus Prime original da linha Generation 1 de 1984, completo com trailer e acessórios', 2200.00, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', action_figures_id, 1, true, true, ARRAY['transformers', 'optimus prime', 'g1', '1984']),
    ('Carrinho Hot Wheels Redline 1968', 'Hot Wheels da primeira série Redline de 1968, modelo Custom Camaro, pintura original', 450.00, 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', carrinhos_id, 2, false, true, ARRAY['hot wheels', 'redline', '1968', 'camaro']),
    ('Jogo War Clássico Grow 1975', 'Primeira edição brasileira do jogo War pela Grow de 1975, peças e tabuleiro originais', 320.00, 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', jogos_id, 4, false, true, ARRAY['war', 'grow', '1975', 'brasileiro']),
    ('Game Boy Original Nintendo 1989', 'Game Boy clássico cinza de 1989, funcionando, tela sem pixels mortos, inclui Tetris', 750.00, 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', videogames_id, 3, false, true, ARRAY['game boy', 'nintendo', '1989', 'tetris']),
    ('Pelúcia Pokémon Pikachu 1998', 'Pelúcia oficial do Pikachu da primeira linha de produtos Pokémon de 1998, Nintendo/Game Freak', 280.00, 'https://images.unsplash.com/photo-1605979399919-d6ce4d7083be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', pelucias_id, 6, false, true, ARRAY['pokemon', 'pikachu', '1998', 'oficial']),
    ('Lego Castle 6080 King''s Castle 1984', 'Set completo do Castelo do Rei da linha Castle de 1984, todas as peças e minifiguras originais', 1450.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', blocos_id, 1, true, true, ARRAY['lego', 'castle', '1984', 'completo']),
    ('Boneco He-Man Masters of Universe 1982', 'Action figure original do He-Man de 1982, articulações funcionando, espada e escudo inclusos', 380.00, 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', action_figures_id, 5, false, true, ARRAY['he-man', 'masters', '1982', 'mattel']);
END $$;