export const Footer = () => {
    const equipo = [
        { nombre: "Ana Pérez", rol: "Frontend Developer" },
        { nombre: "Juan Gómez", rol: "Backend Developer" },
        { nombre: "Laura Díaz", rol: "UX/UI Designer" },
    ]

    return (
        <footer className="bg-slate-800 text-white px-6 py-6">
            <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-6">

                {/* Info de la empresa */}
                <div>
                    <h2 className="text-lg font-bold">Mi Empresa S.A.</h2>
                    <p className="text-slate-300 text-sm mt-1">
                        Av. Siempre Viva 123, Buenos Aires
                    </p>
                    <p className="text-slate-300 text-sm">
                        contacto@miempresa.com · +54 11 1234-5678
                    </p>
                    <p className="text-slate-400 text-xs mt-2">
                        © {new Date().getFullYear()} Mi Empresa S.A.
                    </p>
                </div>

                {/* Tarjetas del equipo */}
                <div className="flex flex-wrap gap-3">
                    {equipo.map((persona) => (
                        <div
                            key={persona.nombre}
                            className="bg-slate-700 rounded-lg px-4 py-2 text-center w-36"
                        >
                            <p className="font-semibold text-sm">{persona.nombre}</p>
                            <p className="text-slate-300 text-xs">{persona.rol}</p>
                        </div>
                    ))}
                </div>

            </div>
        </footer>
    )
}