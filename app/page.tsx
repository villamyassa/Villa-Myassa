{/* Contact */}
<Section id="contact" title="Contact">
  <Card className="rounded-2xl">
    <CardContent className="py-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Input
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Votre email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Votre message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div className="flex gap-3">
            <Button onClick={handleMailto}>Envoyer par email</Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${DATA.email}`}>Ouvrir votre messagerie</a>
            </Button>
          </div>
        </div>

        {/* Bloc infos sans téléphone */}
        <div className="text-sm text-neutral-600">
          <p>
            Email :{" "}
            <a className="underline" href={`mailto:${DATA.email}`}>
              {DATA.email}
            </a>
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
</Section>
