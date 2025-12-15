(module
  (func $_start
    (local $x i32)
    (local $y i32)
    (local $z i32)
    i32.const 4
    local.set $x
    i32.const 2
    local.set $y
    local.get $x
    local.get $y
    i32.mul
    local.set $z
    (block $exit_1
      (loop $loop_2
        local.get $z
        i32.const 0
        i32.gt_s
        i32.eqz
        br_if $exit_1
        local.get $z
        i32.const 1
        i32.sub
        local.set $z
        br $loop_2
      )
    )
  )
)
