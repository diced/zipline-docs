{
  description = "dev env for zipline docs (provides node v24 and golang)";

  inputs = {
    # node 24.4.1
    nixpkgs.url = "github:nixos/nixpkgs/b527e89270879aaaf584c41f26b2796be634bc9d";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        packageJson = builtins.fromJSON (builtins.readFile ./package.json);

        nodejs = pkgs.nodejs_24;
        golang = pkgs.go;
      in
      {
        devShells.default = pkgs.mkShell {
          name = packageJson.name;

          buildInputs = [
            nodejs
            golang
            pkgs.git
            pkgs.corepack
          ];
        };
      }
    );
}
