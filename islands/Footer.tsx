export default function Footer() {
    return (
        <div class="flex flex-col items-center justify-center">
            <table>
                <thead>
                    <tr>
                        <th>
                            <div class="fresh">
                                <a href="https://fresh.deno.dev" target="_blank" class="mt-3 flex items-center gap-1 md:justify-end"><img src="/logo.svg" alt="Fresh logo" class="h-6 w-6"></img>Made with <span class="font-bold">Fresh</span></a>
                            </div>
                        </th>
                        <th>
                            <div class="fresh">
                                <a href="https://github.com/MissingNoo/imissyumemi" target="_blank" class="mt-3 flex items-center gap-1 md:justify-end"><img src="/github-mark.svg" alt="Fresh logo" class="h-6 w-6"></img></a>
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}