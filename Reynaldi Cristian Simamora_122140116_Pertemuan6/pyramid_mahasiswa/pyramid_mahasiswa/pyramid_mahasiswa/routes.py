def includeme(config):
                """Add routes to the config."""
                config.add_static_view('static', 'static', cache_max_age=3600)
                
                # Default route
                config.add_route('home', '/')
                
                # Mahasiswa routes dengan request_method untuk membedakan endpoint dengan URL yang sama
                config.add_route('mahasiswa_list', '/api/namadb', request_method='GET')
                config.add_route('mahasiswa_detail', '/api/namadb/{id}', request_method='GET')
                config.add_route('mahasiswa_add', '/api/namadb', request_method='POST')
                config.add_route('mahasiswa_update', '/api/namadb/{id}', request_method='PUT')
                config.add_route('mahasiswa_delete', '/api/namadb/{id}', request_method='DELETE')